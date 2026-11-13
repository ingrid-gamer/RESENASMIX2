# RESENASMIX — Backend Spring Boot

API REST para el catálogo de videojuegos, reseñas, autenticación JWT y compras demostrativas.

## Requisitos

- Java 21.
- MySQL 8.
- Maven Wrapper incluido.

## Configuración local (Windows PowerShell)

Crea la base de datos `resenasmix` en MySQL. Desde esta carpeta ejecuta:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/resenasmix?useSSL=false&serverTimezone=UTC"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD="TU_CLAVE_MYSQL"
$env:JWT_SECRET="clave-local-de-demostracion-cambiar-antes-de-publicar-2026"
.\mvnw.cmd spring-boot:run
```

API: `http://localhost:8083`
Swagger: `http://localhost:8083/swagger-ui/index.html`
Health: `http://localhost:8083/actuator/health`

El backend inicia en puerto `PORT` cuando la plataforma lo define; localmente usa `8083`.

## Seguridad

- Registro público siempre asigna `ROLE_USER`.
- Contraseñas con BCrypt.
- JWT de acceso firmado; `/api/v1/auth/refresh` renueva un token mientras aún sea válido.
- Admin inicial configurable mediante `APP_ADMIN_USERNAME`, `APP_ADMIN_PASSWORD`, `APP_ADMIN_NOMBRE` y `APP_ADMIN_EMAIL`. No existe una clave predeterminada.
- El autor de las reseñas se obtiene de la identidad autenticada, no del `usuarioId` enviado desde el navegador.

## Compras

`POST /api/v1/compras` crea un registro de compra simulado y calcula el importe en el servidor. No cobra ni integra una pasarela de pago.

## Documentación

Revisa `docs/Documento_Integracion.md`, `docs/Modelo_API.md`, `docs/Despliegue_Railway.md`, `docs/Manual_Usuario.md` y la colección de Postman.
