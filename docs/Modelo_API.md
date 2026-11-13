# Modelo de API — RESENASMIX2

**Base URL local:** `http://localhost:8083`  
**Autenticación:** JWT Bearer para rutas protegidas.  
**Documentación interactiva:** `/swagger-ui/index.html`  
**OpenAPI JSON:** `/v3/api-docs`

## Métodos principales

La ruta de compra registra un pedido demostrativo, no un pago real. El catálogo incluye `imagen`, `descripcion`, `enOferta` y `precioOferta` además de los datos básicos.

| Recurso | Método | Ruta | Acceso | Resultado esperado |
|---|---|---|---|---|
| Autenticación | POST | `/api/v1/auth/register` | Público | 201 al registrar; 409 si username existe |
| Autenticación | POST | `/api/v1/auth/login` | Público | 200 y token JWT; 401 credenciales inválidas |
| Autenticación | POST | `/api/v1/auth/refresh` | Público + Bearer vigente | 200 y JWT renovado; 401 si falta, expiró o es inválido |
| Videojuegos | GET | `/videojuegos` | Público | 200 y listado |
| Videojuegos | GET | `/videojuegos/{id}` | Público | 200 o 404 |
| Videojuegos | POST | `/videojuegos` | ADMIN | 201 |
| Videojuegos | PUT | `/videojuegos/{id}` | ADMIN | 200 o 404 |
| Videojuegos | DELETE | `/videojuegos/{id}` | ADMIN | 204 o 404 |
| Reseñas | GET | `/resenas` | Público | 200 y listado |
| Reseñas | GET | `/resenas/{id}` | Público | 200 o 404 |
| Reseñas | POST | `/resenas` | USER/ADMIN | 201 |
| Reseñas | PUT | `/resenas/{id}` | ADMIN según configuración actual | 200 o 404 |
| Reseñas | DELETE | `/resenas/{id}` | ADMIN | 204 o 404 |
| Usuarios | GET | `/usuarios` | ADMIN | 200 y listado |
| Juegos externos | GET | `/api/v1/juegos-gratis` | Público | 200 si API externa responde |
| Compras | POST | `/api/v1/compras` | USER/ADMIN | 201 y compra simulada persistida |
| Compras | GET | `/api/v1/compras/mis-compras` | USER/ADMIN | 200 y compras del usuario autenticado |
| Salud | GET | `/api/v1/health/ping` | Público | 200 con estado UP y timestamp |
| Salud | GET | `/actuator/health` | Público | Estado general de aplicación y dependencias |

## Ejemplos

### Login

`POST /api/v1/auth/login`

```json
{
  "username": "usuario",
  "password": "contraseña"
}
```

La respuesta contiene `token`, `userId`, `username`, `nombre`, `email`, `role` y `expiresInSeconds`.

### Crear reseña

`POST /resenas`

```json
{
  "videojuegoId": 1,
  "calificacion": 5,
  "comentario": "Muy buen juego."
}
```

Para rutas protegidas enviar el encabezado `Authorization: Bearer <token>`. En POST `/resenas`, el autor se toma desde el JWT; `usuarioId` no se utiliza para atribuir la reseña.

> Verificar rutas, roles y códigos HTTP contra Swagger y la configuración desplegada antes de entregar esta documentación. La tabla refleja el código fuente revisado, no una prueba de producción.


### Registrar compra demostrativa

`POST /api/v1/compras` (JWT requerido)

```json
{
  "nombre": "Usuario Prueba",
  "email": "prueba@example.com",
  "direccion": "Dirección de prueba 123",
  "entrega": "Estándar",
  "items": [
    { "videojuegoId": 1, "cantidad": 1 }
  ]
}
```

La API busca cada videojuego en MySQL, toma su precio desde el backend, calcula el total y guarda una compra con estado `SIMULADA`, asociada al usuario autenticado. No procesa pagos reales. Para bases existentes, ejecutar `docs/sql/actualizar_precio_videojuegos.sql` y completar los precios reales del catálogo antes de la demo.
