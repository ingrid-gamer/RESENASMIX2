# Entrega separada de frontend y backend

El código corregido se entrega en tres archivos ZIP: monorepo completo, frontend aislado y backend aislado. La pauta también solicita dos enlaces públicos de GitHub; los ZIP no publican automáticamente repositorios ni permiten acceder a tu cuenta, así que debes crear esos repositorios y subir cada archivo por separado.

## Repositorio frontend

Usa el contenido de `resenasmix-frontend.zip` en un repositorio público llamado, por ejemplo, `resenasmix-frontend`.

- Raíz del repo: `package.json`, `package-lock.json`, `index.html`, `vite.config.js`, `src/`, `public/`.
- Variables: copia `.env.example` a `.env` para conectar con Spring Boot.
- Para modo demostración local sin API, usa `.env.mock.example` como referencia; ese modo guarda datos en LocalStorage, no en MySQL.
- No subas `node_modules/`, `dist/` ni archivos `.env` con dominios privados o secretos.

## Repositorio backend

Usa el contenido de `resenasmix-backend.zip` en un repositorio público llamado, por ejemplo, `resenasmix-backend`.

- Incluye `pom.xml`, `src/`, `mvnw`, `mvnw.cmd`, `.mvn/`, `Dockerfile`, `docker-compose.yml`, `postman/` y `docs/`.
- Configura MySQL y JWT mediante variables de entorno. Nunca subas las credenciales reales.
- El administrador inicial se crea con `APP_ADMIN_USERNAME`, `APP_ADMIN_PASSWORD`, `APP_ADMIN_NOMBRE` y `APP_ADMIN_EMAIL`.

## Comandos PowerShell para publicar

En cada carpeta ya descomprimida, crea primero el repositorio vacío en GitHub desde el navegador. Luego ejecuta en la terminal integrada de VS Code, reemplazando la URL por la que GitHub te entregue.

```powershell
git init
git add .
git commit -m "Entrega inicial de RESENASMIX"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/resenasmix-frontend.git
git push -u origin main
```

En la carpeta backend, cambia el remoto por:

```text
https://github.com/TU-USUARIO/resenasmix-backend.git
```

Antes de publicar, revisa `git status` y confirma que no aparecen `.env`, contraseñas, `.mvn/wrapper/maven-wrapper.jar` descargados por herramientas locales, `node_modules` ni `target/`.

## Capturas del manual

`docs/Manual_Usuario.md` enumera las capturas que exige la pauta. Debes tomarlas desde la aplicación ejecutándose con `VITE_USE_BACKEND=true`, mostrando datos reales de la base. No se generaron capturas ficticias. Guarda las imágenes en `docs/capturas/` y reemplaza los marcadores del manual antes de exportarlo a PDF.
