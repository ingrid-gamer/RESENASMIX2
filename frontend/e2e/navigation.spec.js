import { test, expect } from '@playwright/test'

test('inicio muestra el contenido principal', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('ResenasMIXX')
  await expect(page.getByRole('heading', { name: /Hablemos de videojuegos/i })).toBeVisible()
})

test('navega al catálogo desde el menú', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Videojuegos' }).click()
  await expect(page.getByRole('heading', { name: 'Videojuegos' })).toBeVisible()
})

test('el buscador filtra resultados', async ({ page }) => {
  await page.goto('/#/videojuegos')
  await page.getByLabel('Buscar videojuego').fill('Minecraft')
  await expect(page.getByText('Minecraft')).toBeVisible()
  await expect(page.getByText('GTA V')).not.toBeVisible()
})

test('agrega un juego al carrito', async ({ page }) => {
  await page.goto('/#/videojuegos')
  await page.getByRole('button', { name: 'Agregar' }).first().click()
  await expect(page.getByRole('link', { name: /Carrito 1/ })).toBeVisible()
})

test('ruta inexistente muestra 404', async ({ page }) => {
  await page.goto('/#/ruta-que-no-existe')
  await expect(page.getByRole('heading', { name: 'Página no encontrada' })).toBeVisible()
})

test('login permite entrar en modo local', async ({ page }) => {
  await page.goto('/#/login')
  await page.getByLabel('Usuario').fill('ingrid')
  await page.getByLabel('Contraseña').fill('123456')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page.getByText('Hola, Ingrid')).toBeVisible()
})
