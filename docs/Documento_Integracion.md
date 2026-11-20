# Documento de Integración — RESENASMIX2

## 1. Propósito

RESENASMIX2 es una aplicación web de reseñas de videojuegos. Las personas pueden crear una cuenta, iniciar sesión, explorar el catálogo, leer y publicar reseñas, agregar juegos al carrito y registrar una compra demostrativa. La compra no procesa dinero ni se conecta a una pasarela de pago.

La solución está separada en tres capas:

| Capa | Tecnología | Responsabilidad |
|---|---|---|
| Interfaz | React + Vite | Renderizar páginas, formularios, filtros y carrito |
| API | Java 21 + Spring Boot 4 | Validar solicitudes, autenticar usuarios y ejecutar reglas de negocio |
| Persistencia | MySQL + Spring Data JPA / Hibernate | Guardar usuarios, juegos, reseñas y compras |

## 2. Configuración de conexión

### Backend — `src/main/resources/application.properties`

La URL JDBC, usuario y contraseña se leen desde variables de entorno. Los valores después de `:` son valores predeterminados para desarrollo local:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/resenasmix?useSSL=false&serverTimezone=UTC}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:root}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:}
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
server.port=${PORT:8083}
```

Hibernate utiliza las entidades para crear o actualizar las tablas durante el desarrollo. Antes de una entrega o migración de producción conviene utilizar migraciones versionadas y respaldar la base de datos; `ddl-auto=update` no sustituye un sistema de migraciones.

### Frontend — `frontend/.env`

```env
VITE_USE_BACKEND=true
VITE_API_URL=http://localhost:8083
```

`VITE_USE_BACKEND=true` selecciona la API Spring Boot. Cuando está en `false`, la aplicación utiliza `mockDatabase.js` y LocalStorage; ese modo sirve para una demostración de interfaz y no demuestra persistencia en MySQL.

## 3. Flujo de una solicitud React → Spring Boot → MySQL

1. La persona realiza una acción en una vista React, por ejemplo, abre el catálogo o envía el formulario de reseña.
2. La vista llama a una función de `frontend/src/services/api.js`, como `listGames()` o `addReview()`.
3. `api.js` utiliza `fetch` para enviar una solicitud HTTP a `VITE_API_URL`. Los datos de formularios se serializan como JSON.
4. Para los recursos protegidos, `api.js` añade `Authorization: Bearer <token>` leyendo `resenasmixx.token` de LocalStorage.
5. Spring Security aplica la política CORS y después ejecuta `JwtFilter`. El filtro extrae el JWT, valida su firma HMAC y expiración mediante `JwtUtil`, y coloca el usuario y su autoridad en `SecurityContextHolder`.
6. `SecurityConfig` determina si el método HTTP y el rol (`ROLE_USER` o `ROLE_ADMIN`) permiten el acceso.
7. El `@RestController` recibe el JSON, aplica validaciones y llama al servicio de negocio correspondiente.
8. La capa `service` aplica reglas. Por ejemplo, `ResenaService` identifica al autor a partir del nombre de usuario autenticado, y `CompraService` calcula el total con los precios que están guardados en la base de datos.
9. Los servicios utilizan interfaces `repository` de Spring Data JPA para consultar o persistir entidades. Hibernate traduce esas operaciones a SQL y MySQL conserva los datos.
10. Spring serializa el resultado como JSON y lo devuelve a React con el código HTTP correspondiente. React actualiza el estado de la vista sin recargar el documento completo.

### Ejemplo de lectura de catálogo

```text
Games.jsx
  → listGames() en services/api.js
  → GET /videojuegos
  → VideojuegoController.listar()
  → VideojuegoService.listar()
  → VideojuegoRepository.findAll()
  → MySQL: videojuegos
  → JSON de videojuegos
  → setGames() en React
```

### Ejemplo de creación de reseña

```text
Reviews.jsx
  → addReview(datos)
  → POST /resenas + Authorization: Bearer <JWT>
  → JwtFilter valida JWT
  → ResenaController.guardar()
  → ResenaService.guardar(dto, authentication.getName())
  → UsuarioRepository + VideojuegoRepository
  → ResenaRepository.save()
  → respuesta JSON con autor y videojuego
```

El backend **no confía en `usuarioId` enviado por React** para atribuir la reseña. Obtiene el usuario desde el JWT para evitar que una persona publique con la identidad de otra.

### Ejemplo de carrito y compra

El carrito se mantiene en el navegador para que no desaparezca al navegar o recargar. Al confirmar el checkout, React envía los identificadores de los videojuegos y las cantidades a `POST /api/v1/compras`. El backend vuelve a consultar los videojuegos en MySQL y calcula el total con el precio de venta vigente (`precioOferta` cuando `enOferta=true`; si no, `precio`). Así no depende del importe enviado por el navegador. La operación queda guardada con estado `SIMULADA`; no se realiza un cobro real.

## 4. Autenticación, JWT y permisos

- `POST /api/v1/auth/register`: registra una cuenta con rol `ROLE_USER` y almacena la contraseña usando BCrypt.
- `POST /api/v1/auth/login`: valida las credenciales con `AuthenticationManager` y emite un JWT firmado.
- `POST /api/v1/auth/refresh`: acepta un JWT vigente en el encabezado Authorization y devuelve un token nuevo con una expiración renovada. No es un refresh token separado: un token que ya expiró no se puede renovar y exige iniciar sesión nuevamente.
- `JwtFilter`: verifica firma y expiración del token y establece la autenticación para la solicitud.
- `SecurityConfig`: limita operaciones administrativas a `ROLE_ADMIN`; la creación de reseñas y las compras requieren sesión.
- `AuthContext.jsx`: mantiene el usuario en estado global, guarda token y usuario en LocalStorage y restaura/refresca la sesión al cargar la aplicación.
- `ProtectedRoute.jsx`: evita que un usuario no autenticado o sin rol administrador abra las rutas administrativas.

El registro público nunca permite seleccionar `ROLE_ADMIN`. El administrador inicial se configura de forma privada mediante variables de entorno `APP_ADMIN_USERNAME`, `APP_ADMIN_PASSWORD`, `APP_ADMIN_NOMBRE` y `APP_ADMIN_EMAIL`. Si el usuario ya existe, el inicializador no cambia su rol ni su contraseña.

## 5. CORS

La configuración CORS está centralizada en `SecurityConfig`. El backend permite los métodos GET, POST, PUT, PATCH, DELETE y OPTIONS, y los encabezados Authorization, Content-Type, Accept y Origin. No se habilitan cookies ni credenciales cross-origin porque la autenticación se envía mediante Bearer JWT.

En desarrollo se permiten `http://localhost:5173` y `http://127.0.0.1:5173`. En Railway se debe configurar `APP_CORS_ALLOWED_ORIGINS` con el dominio HTTPS exacto de Vercel, por ejemplo:

```text
APP_CORS_ALLOWED_ORIGINS=https://tu-sitio.vercel.app
```

Para permitir también un dominio de preview se puede agregar separado por coma. No se recomienda dejar `*` en producción.

## 6. Contrato de datos principal

### Videojuego

React y Java comparten estos atributos: `id`, `titulo`, `genero`, `consola`, `precio`, `precioOferta`, `enOferta`, `imagen`, `descripcion` y `requisitosMinimos`. `requisitosMinimos` es un objeto JSON (puede ser nulo). La entidad Java persiste los mismos campos para evitar que imágenes, descripciones y promociones se pierdan después de recargar.

### Reseña

Contiene `id`, `comentario`, `calificacion`, `usuario` y `videojuego`. El usuario se asigna desde el JWT al crear, no desde el body.

### Compra

Contiene el usuario propietario, datos de entrega, detalle JSON, total, fecha y estado. La compra es un registro de demostración, no una transacción financiera.

## 7. Manejo de respuestas y errores HTTP

| Código | Uso en RESENASMIX2 |
|---|---|
| `200 OK` | Lecturas, login, actualización o refresh correcto |
| `201 Created` | Registro de cuenta, videojuegos, reseñas y compras |
| `204 No Content` | Eliminación correcta |
| `400 Bad Request` | JSON incompleto o validación de campos/precios |
| `401 Unauthorized` | Credenciales incorrectas, token ausente, inválido o vencido |
| `403 Forbidden` | Usuario autenticado sin permisos para la operación |
| `404 Not Found` | ID de videojuego, usuario o reseña inexistente |
| `409 Conflict` | Nombre de usuario o correo duplicado / conflicto de datos únicos |
| `500 Internal Server Error` | Error inesperado; el detalle se registra en backend, no se expone al navegador |

`GlobalExceptionHandler` normaliza los errores de validación y de negocio en un JSON con `timestamp`, `status`, `error`, `message` y `path`. Los errores que ocurren antes de entrar al controlador se configuran en `SecurityConfig`: devuelve JSON para 401 (sin autenticación/token no válido) y 403 (rol insuficiente). En React, `api.js` transforma la respuesta HTTP no exitosa en un error que las vistas muestran al usuario.

## 8. Puesta en marcha local

1. Iniciar MySQL y crear la base `resenasmix`.
2. Configurar usuario y contraseña en variables de entorno o en `application.properties` para pruebas locales.
3. En una terminal, desde la raíz, ejecutar `.\mvnw.cmd spring-boot:run` (Windows) o `./mvnw spring-boot:run` (Linux/macOS). Se utiliza Java 21.
4. En otra terminal, entrar a `frontend`, copiar `.env.example` a `.env`, ejecutar `npm ci` y luego `npm run dev`. Se requiere Node.js 24.15.0 o superior de la rama 24.x.15.0+.
5. Abrir `http://localhost:5173` y probar el catálogo. La API se documenta en `http://localhost:8083/swagger-ui/index.html`.

El catálogo de demostración se inserta automáticamente si `videojuegos` está vacío. No se sobrescriben juegos existentes. El administrador se crea solo si se configuran las cuatro variables indicadas en el apartado 4.

## 9. Comprobaciones antes de entregar

- [ ] `GET /actuator/health` responde `UP` y reporta conectividad con la base de datos.
- [ ] Swagger muestra los endpoints y permite ejecutar operaciones protegidas después de Authorize con `Bearer <token>`.
- [ ] El registro crea `ROLE_USER` y guarda una contraseña BCrypt.
- [ ] El login devuelve JWT, rol y tiempo de expiración.
- [ ] El refresh devuelve un JWT nuevo mientras el anterior siga vigente.
- [ ] Una recarga F5 conserva una sesión válida.
- [ ] Un usuario `ROLE_USER` no puede ejecutar operaciones de administrador.
- [ ] La reseña creada queda asociada al usuario del JWT.
- [ ] Un videojuego agregado al carrito se envía al backend con su cantidad; el total final coincide con el cálculo del servidor.
- [ ] Tras confirmar la compra, aparece el registro en `compras` y la aplicación informa que se trata de una simulación.
- [ ] La aplicación desplegada en Vercel usa `VITE_USE_BACKEND=true` y apunta al dominio Railway correcto.

## 10. Alcance y limitaciones

Este proyecto demuestra una integración fullstack académica. El flujo de compra guarda una solicitud y un detalle de pedido, pero no incluye inventario, stock, pagos reales, conciliación ni pasarela de pago. Las direcciones e imágenes del catálogo son datos de demostración. Las capturas de la aplicación deben tomarse después de ejecutar y probar el sistema con su base de datos; no se incluyen imágenes inventadas como evidencia de funcionamiento.
