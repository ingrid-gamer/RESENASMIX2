# Despliegue y monitoreo — Railway

## Variables del backend

Configurar en el servicio Spring Boot de Railway (no subir secretos al repositorio):

| Variable | Valor |
|---|---|
| `SERVER_PORT` | Usar el puerto que Railway inyecte si la configuración del servicio lo requiere; la aplicación ya admite `SERVER_PORT`. |
| `SPRING_DATASOURCE_URL` | URL JDBC de la base MySQL de Railway, formato `jdbc:mysql://HOST:PUERTO/BASE?useSSL=true&serverTimezone=UTC` según los datos entregados por Railway. |
| `SPRING_DATASOURCE_USERNAME` | Usuario de la base de datos Railway. |
| `SPRING_DATASOURCE_PASSWORD` | Contraseña de la base de datos Railway. |
| `JWT_SECRET` | Secreto largo, aleatorio y exclusivo para producción. No usar el valor de respaldo del repositorio. |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` para el entorno académico actual; para producción real usar migraciones versionadas. |

No copies credenciales en este archivo ni en GitHub. Si las credenciales ya fueron publicadas, rótalas.

## Health check

La aplicación expone:

- `GET /actuator/health`: health check de Spring Boot; incluye estado general y dependencias habilitadas.
- `GET /api/v1/health/ping`: respuesta JSON `UP` y registro `HEARTBEAT` en stdout.

En Railway, configura el **Healthcheck Path** del servicio backend como `/actuator/health`. El endpoint debe responder 200 para que el despliegue se considere saludable. Para registrar pings periódicos en logs, un monitor externo debe consultar `/api/v1/health/ping`; el health check de despliegue no equivale a un monitor continuo.

## Logs

Spring Boot escribe logs en consola (stdout), que Railway muestra en los logs del servicio. El endpoint `/api/v1/health/ping` registra una línea `HEARTBEAT` cada vez que se consulta. Las operaciones de compra demostrativa registran `Compra simulada registrada` con ID, usuario, total y estado.

## AWS / CloudWatch

Este proyecto está desplegado en Railway, no en AWS. Por ello, los logs de Railway **no son automáticamente logs de CloudWatch** y no debe afirmarse que existe integración AWS. Si la pauta exige evidencia de CloudWatch, se necesita configurar una exportación/forwarder desde Railway o desplegar el backend en infraestructura AWS y luego verificar la llegada de eventos en CloudWatch. Esa configuración no se puede dar por cumplida con el código de la aplicación solamente.

## Frontend

En el entorno de compilación del frontend:

- `VITE_USE_BACKEND=true`
- `VITE_API_URL=https://<dominio-publico-del-backend>`

Las variables `VITE_*` se incorporan durante el build de Vite. Configúralas en el servicio que compila y publica el frontend y vuelve a desplegarlo tras modificarlas.


## Preparación de precios de catálogo

El modelo `Videojuego` incorpora `precio`. En una base existente, ejecutar `docs/sql/actualizar_precio_videojuegos.sql` una vez y actualizar los precios de los videojuegos antes de la demostración. Los registros antiguos se inicializan en 0.00 para no asignar precios inventados. La API de compras calcula el total con el precio leído desde MySQL.
