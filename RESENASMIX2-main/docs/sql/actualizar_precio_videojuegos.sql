-- Ejecutar una vez en la base MySQL de RESENASMIX2 antes de probar compras.
-- Los registros antiguos reciben precio 0 para no inventar precios de catálogo.
ALTER TABLE videojuegos ADD COLUMN IF NOT EXISTS precio DECIMAL(12,2) NULL;
UPDATE videojuegos SET precio = 0.00 WHERE precio IS NULL;
