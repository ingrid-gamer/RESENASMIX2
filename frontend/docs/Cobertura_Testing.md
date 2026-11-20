# Documento de cobertura de testing · ResenasMIXX

## Alcance

La estrategia de pruebas de la entrega 2 se divide en dos niveles:

1. **Pruebas unitarias y de componentes:** Vitest + jsdom + React Testing Library.
2. **Pruebas end-to-end:** Playwright en Chromium.

El objetivo es comprobar renderizado, props, estado, eventos, navegación y operaciones CRUD de la persistencia simulada.

## Aislamiento de Internet

Las pruebas unitarias utilizan `src/data/mockDatabase.js` y `localStorage`. No dependen de Spring Boot ni de una API externa. Por ello, la prueba unitaria puede ejecutarse aunque el equipo se quede sin Internet.

## Pruebas implementadas

El proyecto incluye más de las 10 pruebas solicitadas como mínimo por la pauta. Se cubren creación, actualización, eliminación, búsqueda, renderizado de tarjetas, eventos de carrito, carga del inicio, filtros del catálogo, estado de formularios, login y promedio de calificaciones.

## Cobertura

Se genera con: `npm run test:coverage`. Vitest utiliza el proveedor V8 y genera `coverage/index.html`. La cobertura mide sentencias, ramas, funciones y líneas ejecutadas durante las pruebas.

El archivo de configuración deja umbrales orientativos del 80 % para mantener un objetivo claro de calidad. La cobertura real debe registrarse en el informe entregado después de ejecutar el comando en el computador o en GitHub Actions.

## CI

GitHub Actions ejecuta el mismo conjunto de pruebas para dejar evidencia reproducible en la pestaña **Actions**. También guarda el informe de cobertura como artefacto del workflow.
