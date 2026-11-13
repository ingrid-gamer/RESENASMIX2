# Manual de usuario — RESENASMIX2

**Objetivo:** orientar a la persona usuaria para consultar videojuegos, leer y publicar reseñas y registrar una compra demostrativa desde el carrito.

> **Evidencia visual pendiente de captura:** este documento deja definidos los espacios y nombres de archivo para pantallazos reales. Debes insertar capturas tomadas desde tu navegador después de ejecutar la aplicación conectada al backend. No se incluyen imágenes ficticias ni capturas de un modo simulado como evidencia de integración MySQL.

Guarda las imágenes en `docs/capturas/` con estos nombres. Luego reemplaza cada línea `![...](capturas/...)` por la imagen capturada.

## 1. Ingreso al sitio

Abra la URL de RESENASMIX2. En la página principal se encuentran los accesos al catálogo, categorías, ofertas, reseñas, carrito y cuenta de usuario.

**Pantallazo requerido:** `capturas/01-inicio.png`.

## 2. Crear una cuenta

1. Seleccione **Registro**.
2. Complete nombre, nombre de usuario, correo y contraseña (mínimo 6 caracteres).
3. Presione **Registrarme**.
4. Si el nombre de usuario o correo ya está registrado, corrija el dato e intente nuevamente.
5. Una vez creado el usuario, vaya a **Login**.

El registro público asigna el rol `ROLE_USER`; no permite crear administradores desde la interfaz pública.

**Pantallazo requerido:** `capturas/02-registro.png`.

## 3. Iniciar sesión

1. Seleccione **Login**.
2. Ingrese el nombre de usuario y contraseña.
3. Presione **Entrar**.
4. Si las credenciales son correctas, se guardará el JWT y los datos básicos del usuario en LocalStorage. Una recarga de la página restaura la sesión mientras el token siga vigente.

**Pantallazo requerido:** `capturas/03-login.png`.

## 4. Explorar videojuegos

1. Abra **Videojuegos**.
2. Busque por título o explore los juegos del catálogo.
3. Utilice el filtro de género.
4. Seleccione un juego para revisar su descripción, precio, disponibilidad de oferta y reseñas asociadas.

**Pantallazos requeridos:** `capturas/04-catalogo.png` y `capturas/05-detalle-y-resenas.png`.

## 5. Leer y publicar reseñas

1. Abra **Reseñas** para leer los comentarios y calificaciones publicados por la comunidad.
2. Inicie sesión para publicar.
3. Seleccione el videojuego desde la lista.
4. Asigne una calificación de 1 a 5 estrellas.
5. Escriba una opinión fundamentada (entre 5 y 500 caracteres) y presione **Publicar**.
6. Compruebe que aparezca en la lista.

El backend registra como autor al usuario del JWT, no a un ID proporcionado por el navegador.

**Pantallazo requerido:** `capturas/06-publicar-resena.png`.

## 6. Carrito y checkout

1. En el catálogo o detalle del videojuego, presione **Agregar al carrito**.
2. Abra **Carrito** para revisar títulos, cantidades y total.
3. Elimine elementos o vacíe el carrito cuando corresponda.
4. Presione **Continuar al checkout**. En modo backend se requiere iniciar sesión.
5. Complete nombre, correo, dirección y tipo de entrega.
6. Presione **Confirmar compra simulada**.

El servidor recalcula el total utilizando los precios registrados en MySQL y guarda el pedido con estado `SIMULADA`. **No se procesa un pago real ni se cobra dinero.**

**Pantallazos requeridos:** `capturas/07-carrito.png`, `capturas/08-checkout.png` y `capturas/09-compra-exitosa.png`.

## 7. Administración

La administración solo está disponible para cuentas cuyo rol sea `ROLE_ADMIN`. El administrador puede gestionar videojuegos y revisar/eliminar reseñas. Si una persona con rol `ROLE_USER` escribe `/admin` manualmente, la aplicación la redirige al inicio; además, Spring Security bloquea las operaciones protegidas en el backend.

El administrador inicial se crea mediante variables privadas del backend: `APP_ADMIN_USERNAME`, `APP_ADMIN_PASSWORD`, `APP_ADMIN_NOMBRE` y `APP_ADMIN_EMAIL`. No existe una contraseña de administrador fija en el código.

**Pantallazos requeridos:** `capturas/10-panel-admin.png` y `capturas/11-crud-videojuegos.png`.

## 8. Cerrar sesión

Presione **Salir**. Se eliminan el token y el usuario guardados en LocalStorage. Las rutas protegidas solicitarán volver a iniciar sesión.

**Pantallazo requerido:** `capturas/12-sesion-cerrada.png`.

## 9. Problemas frecuentes

- **No puedo iniciar sesión:** verifique el usuario y contraseña; si el token expiró, vuelva a iniciar sesión.
- **No aparecen videojuegos:** compruebe que MySQL está disponible, que `GET /videojuegos` responde y que el frontend apunta al backend correcto.
- **No puedo publicar una reseña:** inicie sesión y asegúrese de seleccionar un juego y escribir un comentario válido.
- **Aparece un error CORS:** agregue el origen exacto del frontend en `APP_CORS_ALLOWED_ORIGINS` y reinicie el backend.
- **No se registra la compra:** compruebe la sesión, la conexión a MySQL y que los videojuegos del carrito existan en la base de datos.

## 10. Lista de evidencia visual para la entrega

- [ ] Inicio
- [ ] Registro de usuario
- [ ] Login
- [ ] Catálogo de videojuegos
- [ ] Detalle de videojuego y lectura de reseñas
- [ ] Formulario y creación de reseña
- [ ] Carrito de compras
- [ ] Checkout
- [ ] Compra exitosa
- [ ] Panel administrativo y CRUD de videojuegos
- [ ] Cierre de sesión

Las capturas deben corresponder a la versión final, ejecutada con `VITE_USE_BACKEND=true` y conectada a MySQL. No compartas contraseñas ni tokens en las capturas.
