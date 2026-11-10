# ResenasMIXX Frontend · React + Vite

Frontend de la segunda entrega de DSY1104. El proyecto transforma la página HTML original de ResenasMIXX en una SPA React y agrega navegación con React Router, persistencia simulada en JavaScript, Bootstrap, pruebas unitarias con Vitest, pruebas E2E con Playwright y flujo de despliegue a GitHub Pages.

## 1. Instalación

Requiere Node.js 22 LTS o superior.

```bash
npm install
npx playwright install chromium
```

## 2. Desarrollo

```bash
npm run dev
```

La aplicación se abre normalmente en `http://localhost:5173`.

## 3. Scripts de package.json

```bash
npm run dev
npm run lint
npm run test
npm run test:run
npm run test:coverage
npm run test:e2e
npm run test:e2e:ui
npm run build
npm run preview
npm run deploy
```

## 4. Persistencia simulada

`src/data/mockDatabase.js` funciona como una pequeña base de datos en JavaScript. Guarda videojuegos, usuarios y reseñas en `localStorage` y contiene operaciones de crear, leer, actualizar y eliminar. Esto permite trabajar sin Internet y permite que las pruebas no dependan de la API.

## 5. Backend Spring Boot

El frontend tiene una sola capa de servicios en `src/services/api.js`.

Por defecto usa el archivo de persistencia local:

```env
VITE_USE_BACKEND=false
VITE_API_URL=http://localhost:8083
```

Para consumir el backend real:

```env
VITE_USE_BACKEND=true
VITE_API_URL=http://localhost:8083
```

El login usa `/api/v1/auth/login` y `/api/v1/auth/register`. El catálogo y reseñas usan `/videojuegos` y `/resenas`.

## 6. Navegación React Router

Se utiliza `HashRouter`, por lo que las rutas publicadas en GitHub Pages conservan una URL del tipo `#/videojuegos`. Las rutas principales son:

- `/` inicio
- `/videojuegos` catálogo y filtros
- `/videojuegos/:id` detalle
- `/categorias` categorías
- `/ofertas` ofertas
- `/resenas` listado y formulario de reseña
- `/carrito` carrito
- `/checkout` checkout simulado
- `/compra-exitosa` y `/compra-fallida`
- `/login` y `/registro`
- `/admin` panel administrativo
- `/admin/videojuegos` CRUD de videojuegos
- `/admin/resenas` eliminación de reseñas

## 7. Testing

Las pruebas unitarias usan Vitest + jsdom + React Testing Library. Los tests no llaman a Internet: se apoyan en la persistencia simulada de `localStorage`.

Las pruebas E2E usan Playwright y ejecutan la aplicación compilada con `vite preview`.

```bash
npm run test:run
npm run test:coverage
npm run test:e2e
```

La carpeta `coverage/` contiene el informe HTML y `playwright-report/` el informe HTML de las pruebas de navegador.

## 8. GitHub Actions

`.github/workflows/frontend-ci.yml` ejecuta lint, pruebas unitarias, cobertura, Playwright y build antes de publicar el `dist/` en GitHub Pages en cada push a `main`.

La pauta proporcionada también menciona Jasmine + Karma. La guía de instalación adjunta para este proyecto usa Vitest + Playwright como ruta principal; por eso esta implementación sigue esa ruta y deja Jasmine/Karma como alternativa de autoestudio, en lugar de mezclar dos test runners en el mismo flujo.
