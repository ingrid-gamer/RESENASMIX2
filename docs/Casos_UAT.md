# Caso UAT — Aceptación de usuario RESENASMIX2

## Objetivo
Validar que una persona usuaria pueda descubrir videojuegos, consultar información, registrarse, iniciar sesión y publicar una reseña. La compra se considera una demostración simulada mientras no exista persistencia de pedidos en backend.

## Participantes y precondiciones
- Evaluador/a que actúa como usuario final.
- Aplicación desplegada y accesible.
- Backend conectado a la base de datos.
- Usuario de prueba con rol `ROLE_USER`.
- Al menos un videojuego disponible en el catálogo.

## Flujo de aceptación
1. Entrar a la página principal.
2. Abrir el catálogo y buscar un videojuego.
3. Abrir el detalle y revisar sus datos.
4. Registrarse o iniciar sesión.
5. Publicar una reseña con calificación y comentario.
6. Recargar la página y comprobar que la reseña continúa visible.
7. Agregar un juego al carrito y recorrer el checkout, identificándolo expresamente como compra simulada si no se ha implementado el registro backend.

## Criterios de aceptación
- Las pantallas principales cargan sin errores.
- El catálogo y las reseñas proceden del backend cuando `VITE_USE_BACKEND=true`.
- El login entrega una sesión autenticada.
- La reseña queda almacenada en la base de datos y puede recuperarse.
- Los errores se muestran sin perder datos silenciosamente.

## Acta UAT
| Campo | Registro |
|---|---|
| Fecha | __________________ |
| Evaluador/a | __________________ |
| Ambiente / URL | __________________ |
| Resultado | Aceptado / Aceptado con observaciones / Rechazado |
| Observaciones | __________________ |
| Firma / conformidad | __________________ |
