# Pruebas VAT — RESENASMIX2

Máximo: cinco casos de validación de aceptación. Ejecutar en el ambiente integrado con frontend, backend y base de datos reales. Registrar evidencia (captura, fecha, resultado y responsable) por cada ejecución.

| ID | Escenario | Pasos | Resultado esperado | Evidencia |
|---|---|---|---|---|
| VAT-01 | Registro e inicio de sesión | Registrar usuario nuevo; cerrar sesión; iniciar sesión con sus credenciales. | Registro exitoso; login devuelve JWT y la interfaz muestra la sesión iniciada. | Capturas de registro y sesión; respuesta HTTP 201/200. |
| VAT-02 | Consulta y búsqueda de videojuegos | Abrir catálogo; buscar un título existente; abrir su detalle. | El catálogo carga desde API y la búsqueda muestra coincidencias sin datos de prueba locales. | Captura del catálogo y pestaña Network. |
| VAT-03 | Crear reseña | Iniciar sesión con usuario habilitado; abrir videojuego; enviar calificación y comentario. | API responde 201; reseña aparece al volver a consultar y permanece tras recargar. | Captura y respuesta POST/GET. |
| VAT-04 | Compra demostrativa | Agregar producto; revisar carrito; completar checkout; confirmar. | La API responde 201; se genera un ID de compra y el registro queda guardado en MySQL. El usuario puede consultar su historial. | ID de compra, respuesta API y consulta persistida. |
| VAT-05 | Control de acceso y salud | Consultar endpoint protegido sin token y con token; consultar `/api/v1/health/ping` y `/actuator/health`. | Ruta protegida rechaza acceso anónimo; token válido permite acceso; salud responde 200/UP. | Respuestas HTTP y log del heartbeat. |

## Registro de ejecución

Por cada caso completar: fecha/hora, ambiente, usuario/rol, resultado (Aprobado/Rechazado), observación, evidencia y nombre del evaluador.

**Nota:** VAT-04 no debe marcarse aprobado hasta que la compra esté persistida en backend. El nuevo endpoint registra la compra simulada en MySQL. La transacción no representa un pago real. El total debe calcularse con el precio almacenado en MySQL, no con un valor enviado por el navegador.
