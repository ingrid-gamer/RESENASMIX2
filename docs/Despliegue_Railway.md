# Despliegue y monitoreo — Railway + Vercel

Este repositorio contiene un monorepo: Spring Boot está en la raíz y React/Vite en `frontend/`. El backend se conecta a MySQL por JDBC. El carrito se conserva en el navegador; al confirmar una compra en modo backend se registra una compra demostrativa en MySQL. No se procesa un pago real.

## 1. Servicio MySQL en Railway

Crea un servicio MySQL dentro del mismo proyecto Railway. Conserva el nombre real del servicio; en los ejemplos siguientes se usa `MySQL`. Para que el backend se conecte de forma privada dentro de Railway, referencia las variables del servicio MySQL (no uses el TCP Proxy público para la comunicación entre servicios).

## 2. Variables del servicio Spring Boot

Configura estas variables en el servicio backend:

| Variable | Valor |
|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?serverTimezone=UTC` |
| `SPRING_DATASOURCE_USERNAME` | `${{MySQL.MYSQLUSER}}` |
| `SPRING_DATASOURCE_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |
| `PORT` | No la definas manualmente si Railway ya la inyecta. La aplicación usa `${PORT:8083}`. |
| `JWT_SECRET` | Secreto aleatorio de al menos 32 bytes, exclusivo para producción. |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` para el proyecto académico; en producción real conviene usar migraciones versionadas. |
| `APP_CORS_ALLOWED_ORIGINS` | URL exacta del frontend Vercel, por ejemplo `https://tu-proyecto.vercel.app` (sin `/` al final). |
| `APP_SEED_CATALOG` | `true` para cargar el catálogo de demostración si la tabla está vacía. |
| `APP_ADMIN_USERNAME` | Nombre de usuario que tendrá el administrador inicial. |
| `APP_ADMIN_PASSWORD` | Contraseña elegida por el responsable; se almacena cifrada con BCrypt. |
| `APP_ADMIN_NOMBRE` | Nombre visible del administrador. |
| `APP_ADMIN_EMAIL` | Correo del administrador. |

Reemplaza `MySQL` por el nombre exacto del servicio si es distinto. Railway permite usar referencias `${{NombreServicio.VARIABLE}}`. No copies contraseñas ni JWT_SECRET a este documento o al repositorio. El usuario administrador solo se crea cuando se informan las cuatro variables `APP_ADMIN_*` correspondientes; no existe una contraseña predeterminada. Si ese username ya existe, el inicializador no cambia su rol ni su clave.

## 3. Configuración de despliegue del backend

- Root Directory: `/` (raíz del repositorio).
- Builder: Dockerfile.
- Dockerfile: `Dockerfile` de la raíz.
- Healthcheck Path: `/actuator/health`.
- Public Networking: genera un dominio público para que Vercel pueda acceder a la API.

Prueba desde el navegador o Postman:

- `GET https://<dominio-backend>/actuator/health`
- `GET https://<dominio-backend>/api/v1/health/ping`
- `GET https://<dominio-backend>/swagger-ui/index.html`

El health check depende de que MySQL esté accesible; si el servicio cae durante el inicio, revisa los logs del backend y las referencias de variables.

## 4. Frontend en Vercel

Importa el mismo repositorio de GitHub y configura:

- Root Directory: `frontend`.
- Framework Preset: Vite.
- Build Command: `npm run build`.
- Output Directory: `dist`.
- Node.js: 24.x, versión 24.15.0 o superior (coherente con `package.json` y `.nvmrc`).

Variables de entorno de Vercel:

| Variable | Valor |
|---|---|
| `VITE_USE_BACKEND` | `true` |
| `VITE_API_URL` | `https://<dominio-publico-backend>` sin `/` final |

Después de cambiar variables `VITE_*`, vuelve a desplegar porque Vite las incorpora durante la compilación. El dominio final de Vercel debe coincidir exactamente con `APP_CORS_ALLOWED_ORIGINS` en Railway.

## 5. Desarrollo local en Windows

Requisitos: JDK 21, Node.js 24.15.0 o superior de la rama 24.x, npm y una instancia MySQL.

**Terminal 1 — MySQL:** inicia el servicio MySQL local o usa Docker Compose. `docker compose up -d mysql` levanta únicamente la base de datos.

**Terminal 2 — backend, desde la carpeta raíz del proyecto:**

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/resenasmix?useSSL=false&serverTimezone=UTC"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD="TU_CLAVE_MYSQL"
$env:JWT_SECRET="clave-local-de-demostracion-cambiar-antes-de-publicar-2026"
.\mvnw.cmd spring-boot:run
```

**Terminal 3 — frontend, desde `frontend/`:**

```powershell
Copy-Item .env.example .env
npm ci
npm run dev
```

En `.env`, confirma `VITE_USE_BACKEND=true` y `VITE_API_URL=http://localhost:8083`. Abre `http://localhost:5173`.

Alternativa para iniciar los tres servicios de demostración mediante Docker:

```powershell
docker compose up --build
```

En el Compose incluido, MySQL se publica localmente en el puerto `3307`; el backend se comunica con el contenedor MySQL por `mysql:3306`. La ejecución de Vite sigue siendo mediante `npm ci` y `npm run dev` en `frontend/`.

## 6. Logs y monitoreo

Spring Boot escribe los logs en stdout, visibles en Railway. `GET /api/v1/health/ping` registra una línea `HEARTBEAT` cada vez que se consulta. Las compras de demostración generan un log con identificador, usuario, total y estado.

Este proyecto está desplegado en Railway, no en AWS. Los logs de Railway **no son automáticamente logs de Amazon CloudWatch**. Si la pauta exige evidencia de CloudWatch, se requiere configurar explícitamente una exportación o desplegar el backend en AWS y comprobar la llegada de los eventos.

## 7. Consideraciones de datos

- El inicializador crea diez juegos de demostración solo si `videojuegos` está vacía; no borra ni sobrescribe los juegos existentes.
- El registro público crea usuarios `ROLE_USER`. El administrador inicial se configura mediante variables `APP_ADMIN_*`.
- Las contraseñas se procesan con BCrypt.
- El endpoint `/api/v1/auth/refresh` renueva un JWT mientras el token actual todavía sea válido. Una vez vencido, el usuario debe iniciar sesión otra vez. No se implementa un refresh token de larga duración independiente.
- La compra queda registrada como demostración. No existe integración con una pasarela de pago.
