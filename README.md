# RESENASMIX2 — Plataforma de reseñas de videojuegos

Aplicación fullstack en la que las personas pueden explorar videojuegos, revisar comentarios y calificaciones de la comunidad, abrir el detalle de cada juego y añadirlo al carrito. Las cuentas registradas pueden publicar reseñas. El administrador gestiona el catálogo y modera reseñas.

El proyecto se entrega como monorepo: backend Spring Boot en la raíz y frontend React/Vite en `frontend/`.

## Tecnologías

- Frontend: React, React Router, Vite y Bootstrap.
- Backend: Java 21, Spring Boot, Spring Security, JWT, Spring Data JPA y Hibernate.
- Persistencia: MySQL.
- API: REST JSON y documentación Swagger/OpenAPI.

## Puesta en marcha local (Windows)

### 1. Base de datos

Inicia MySQL y crea una base llamada `resenasmix`. Alternativamente, con Docker Desktop puedes iniciar MySQL y el backend:

```powershell
docker compose up --build
```

El servicio MySQL del Compose se publica en el puerto local `3307`. La aplicación Spring Boot escucha en `8083`.

### 2. Backend

En una terminal de VS Code, desde la raíz del proyecto:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/resenasmix?useSSL=false&serverTimezone=UTC"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD="TU_CLAVE_MYSQL"
$env:JWT_SECRET="clave-local-de-demostracion-cambiar-antes-de-publicar-2026"
.\mvnw.cmd spring-boot:run
```

Si usas el Docker Compose, no ejecutes el backend otra vez en Windows: ya queda iniciado dentro del contenedor y conecta a MySQL por el nombre de servicio `mysql`.

### 3. Frontend

Instala Node.js 24.15.0 o superior de la rama 24.x. Abre una segunda terminal de VS Code:

```powershell
cd frontend
Copy-Item .env.example .env
npm ci
npm run dev
```

En `frontend/.env`, confirma:

```env
VITE_USE_BACKEND=true
VITE_API_URL=http://localhost:8083
```

Abre `http://localhost:5173`.

Para ejecutar solo la interfaz con datos locales de demostración, usa `frontend/.env.mock.example` como base del archivo `.env`. Ese modo usa LocalStorage y no demuestra persistencia en MySQL.

## Administrador inicial

No existe una cuenta administradora con contraseña fija dentro del código. Para crear la cuenta inicial, define en el backend:

```text
APP_ADMIN_USERNAME=usuario_admin
APP_ADMIN_PASSWORD=una_clave_segura_de_al_menos_8_caracteres
APP_ADMIN_NOMBRE=Administrador
APP_ADMIN_EMAIL=admin@ejemplo.cl
```

El inicializador cifra la clave con BCrypt y no cambia una cuenta existente. El registro público siempre genera usuarios `ROLE_USER`.

## Funcionalidad de reseñas y compra

El detalle de cada juego muestra las reseñas correspondientes. El usuario puede consultar las experiencias de la comunidad, agregar el videojuego al carrito y continuar al checkout. En modo backend, la compra queda registrada en MySQL como demostración. El backend vuelve a calcular el total con los precios vigentes en MySQL; no se procesa un pago real ni existe una pasarela de pago.

## Documentación de entrega

- `docs/Documento_Integracion.md`: arquitectura y flujo React → API → Spring → JPA → MySQL.
- `docs/Modelo_API.md`: endpoints.
- `docs/Manual_Usuario.md`: pasos de uso y lista de capturas que debes agregar desde una ejecución real.
- `docs/Despliegue_Railway.md`: despliegue de backend en Railway y frontend en Vercel.
- `docs/Entrega_Repositorios.md`: instrucciones para separar y publicar frontend/backend.
- `docs/Revision_Tecnica.md`: lista de correcciones y comprobaciones realmente realizadas/pendientes.
- `postman/ResenasMix.postman_collection`: colección para pruebas manuales de API.

## Advertencias de entrega

- La aplicación no incluye pagos reales.
- Las reseñas de la base no se inventan ni se precargan: registra usuarios y publica reseñas reales de prueba antes de la presentación.
- Debes completar las capturas indicadas en el Manual de Usuario, usando la aplicación conectada a MySQL.
- Las credenciales de MySQL, JWT y administrador deben configurarse localmente o en Railway; no deben guardarse en GitHub.
