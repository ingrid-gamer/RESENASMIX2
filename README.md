# ReseñasMix 

ResenasMix es nuestro primer proyecto en Spring Boot que funciona como una página web de reseñas de videojuegos.  
El sistema permite administrar usuarios, videojuegos y reseñas, además de consumir APIs externas para obtener información adicional sobre videojuegos adicional sobre videojuegos.

---

## Descripción del proyecto
  
La aplicación permite:

- Registrar usuarios
- Registrar videojuegos
- Crear reseñas asociadas a un usuario y a un videojuego
- Editar y eliminar registros
- Consultar listados desde la base de datos
- Consumir una API externa de videojuegos
- Autenticar usuarios mediante JWT
- Explorar y probar los endpoints desde Swagger UI

El proyecto está conectado a MySQL mediante Docker y utiliza Spring Data JPA / Hibernate para persistir la información.

---

## Objetivo

El objetivo principal es construir un backend funcional, ordenado y conectado a base de datos, aplicando:

- Arquitectura en capas
- CRUD completo
- Relaciones entre entidades
- Validaciones
- Manejo de excepciones
- DTO
- Consumo de APIs externas
- Seguridad con Spring Security y JWT
- Documentación automática con Swagger / OpenAPI
- Pruebas unitarias con JUnit y Mockito
- Contenerización con Docker

---

## Tecnologías utilizadas

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Validation
- Spring Security
- WebClient
- RestTemplate
- MySQL
- Docker / Docker Compose
- Maven
- Lombok
- JUnit 5
- Mockito
- Springdoc OpenAPI (Swagger UI)

---

## Arquitectura del proyecto

El proyecto está organizado en capas para mantener el código ordenado y fácil de mantener:

### `controller`
Recibe las peticiones HTTP y expone los endpoints REST.

### `service`
Contiene la lógica de negocio.

### `repository`
Permite comunicarse con la base de datos usando JPA.

### `model`
Contiene las entidades mapeadas a la base de datos.

### `dto`
Contiene objetos de transferencia de datos para solicitudes y respuestas.

### `exception`
Contiene el manejo global de errores y excepciones personalizadas.

### `config`
Contiene configuraciones como `WebClient`, `SecurityConfig` y `SwaggerConfig`.

### `security`
Contiene la lógica de autenticación JWT: filtros, utilidades y clases de soporte de Spring Security.

---

## Funcionalidades principales

### CRUD de Usuarios
Permite:

- Crear usuarios
- Listar usuarios
- Buscar usuario por ID
- Actualizar usuario
- Eliminar usuario

### CRUD de Videojuegos
Permite:

- Crear videojuegos
- Listar videojuegos
- Buscar videojuego por ID
- Actualizar videojuego
- Eliminar videojuego

### CRUD de Reseñas
Permite:

- Crear reseñas
- Listar reseñas
- Buscar reseña por ID
- Actualizar reseña
- Eliminar reseña

Cada reseña está relacionada con:

- Un usuario
- Un videojuego

### Consulta de juegos externos
Se consume la API de FreeToGame para obtener videojuegos gratuitos desde una fuente externa.
Se eliminó la API del clima utilizada anteriormente y se mantuvo la de juegos

---

## Seguridad — Spring Security + JWT

Se implementó autenticación y autorización usando **Spring Security** junto con **JSON Web Tokens (JWT)**.

### Flujo de autenticación

1. El usuario envía sus credenciales al endpoint `POST /api/v1/auth/login`
2. El servidor valida las credenciales y, si son correctas, genera un token JWT firmado
3. El cliente incluye el token en el header de cada petición protegida:
   ```
   Authorization: Bearer <token>
   ```
4. El filtro JWT intercepta cada request, valida el token y carga el contexto de seguridad

### Endpoints públicos y protegidos

| Tipo | Ejemplo |
|------|---------|
| Público | `POST /api/v1/auth/login`, `POST /api/v1/auth/register` |
| Protegido (requiere JWT) | `GET /usuarios`, `POST /resenas`, etc. |


---

## Documentación — Swagger / OpenAPI

Se integró **Springdoc OpenAPI** para generar documentación interactiva de todos los endpoints de la API.

### Acceso a Swagger UI

Con la aplicación corriendo, accedé desde el navegador a:

```
http://localhost:8083/swagger-ui/index.html
```

### Acceso al JSON de la especificación OpenAPI

```
http://localhost:8083/v3/api-docs
```

### Autenticación en Swagger

Para probar endpoints protegidos desde Swagger UI:

1. Usa el endpoint `POST /api/v1/auth/login` para obtener el token JWT
2. Hace clic en el botón **Authorize** (ícono de candado)
3. Ingresa el token con el formato: `Bearer <token>`
4. Todos los requests siguientes incluirán el header de autorización automáticamente

---

## Pruebas unitarias — JUnit 5 + Mockito

Se implementaron pruebas unitarias para verificar el comportamiento de los controladores y servicios de forma aislada, sin necesidad de base de datos ni servidor real.


## Frontend React

El frontend de la segunda entrega está en `frontend/` y usa Vite, React, React Router, Bootstrap, Vitest y Playwright. La persistencia simulada está en `frontend/src/data/mockDatabase.js` y la integración con el backend en `frontend/src/services/api.js`.

Para ejecutarlo:

```bash
cd frontend
npm install
npm run dev
```

## Docker

Se reemplazó **Laragon** por **Docker** para gestionar el entorno de base de datos de forma portable y reproducible, y **Swagger UI** como alternativa a Postman para probar los endpoints.

### Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo


## Manejo de excepciones

Se implementó un manejador global de excepciones para responder con mensajes claros cuando ocurre un error.

### Errores controlados:
- Recurso no encontrado
- Fallo de validación
- Error interno del servidor
- Token JWT inválido o expirado

Esto permite que la API devuelva respuestas ordenadas y fáciles de entender.

---

## Logs y depuración

El proyecto muestra mensajes en consola para facilitar el seguimiento de las acciones realizadas.

### Ejemplos de logs:
- Listado de usuarios
- Guardado de videojuegos
- Creación de reseñas
- Eliminación de registros
- Consultas a APIs externas
- Autenticación y generación de tokens JWT

La configuración de debug está activada en `application.properties`.

