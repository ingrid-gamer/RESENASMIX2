# RESENASMIX2 — Frontend React + Vite

Interfaz web de una plataforma de reseñas de videojuegos. La persona usuaria explora el catálogo, abre el detalle de cada juego, lee opiniones y calificaciones, publica reseñas con su cuenta y puede agregar videojuegos al carrito para registrar una compra demostrativa.

## Requisitos

- Node.js 24.15.0 o superior de la rama 24.x (se define en `.nvmrc`).
- npm.
- Backend Spring Boot y MySQL disponibles para el modo integrado.

## Instalación y ejecución

```powershell
Copy-Item .env.example .env
npm ci
npm run dev
```

Vite abre normalmente `http://localhost:5173`.

## Conexión con backend real

El archivo `.env.example` está preparado para utilizar la API real:

```env
VITE_USE_BACKEND=true
VITE_API_URL=http://localhost:8083
```

En Vercel configura las mismas variables, reemplazando la URL local por el dominio público de Spring Boot. Recuerda volver a desplegar después de editar variables `VITE_*`.

Para probar solo la interfaz con datos locales, copia el contenido de `.env.mock.example` en `.env` y utiliza `VITE_USE_BACKEND=false`. Esta alternativa guarda juegos, usuarios y reseñas en LocalStorage; no demuestra la integración con MySQL.

## Scripts

```powershell
npm run dev
npm run lint
npm run test:run
npm run test:coverage
npm run test:e2e
npm run build
npm run preview
```

Las pruebas unitarias usan Vitest + React Testing Library. Las pruebas E2E usan Playwright. Para instalar el navegador de Playwright, ejecuta `npx playwright install chromium`.

## Rutas principales

- `/` — inicio.
- `/videojuegos` — catálogo, filtros y búsqueda.
- `/videojuegos/:id` — detalle, promedio de calificación y reseñas del juego.
- `/categorias` y `/ofertas` — navegación por género y promociones.
- `/resenas` — lectura y publicación de reseñas.
- `/carrito` y `/checkout` — carrito y compra demostrativa.
- `/login` y `/registro` — autenticación.
- `/admin`, `/admin/videojuegos`, `/admin/resenas` — administración restringida a `ROLE_ADMIN`.

Se utiliza `HashRouter`, por lo que las rutas incluyen `#/` al publicarse en un hosting estático.

## Seguridad y persistencia

`AuthContext.jsx` guarda el JWT y un resumen del usuario en LocalStorage y restaura la sesión al cargar la aplicación. En modo backend intenta renovar un token mientras el JWT actual siga vigente. `ProtectedRoute.jsx` restringe checkout a usuarios autenticados y las pantallas administrativas a administradores. El backend vuelve a validar cada petición; ocultar enlaces en React no sustituye la seguridad del servidor.

El carrito se persiste en LocalStorage. Al confirmar compra, el backend vuelve a buscar los precios en MySQL y guarda una compra simulada. No se realiza un cobro real.
