import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import { CartProvider } from '../contexts/CartContext'
import Games from './Games'

describe('Games', () => {
  test('permite buscar un videojuego por texto', async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Games />
        </CartProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()
    const input = await screen.findByRole('textbox')
    await user.type(input, 'Minecraft')

    await waitFor(() => {
      expect(screen.getByText('Minecraft')).toBeInTheDocument()
    })
  })

  test('permite filtrar por genero', async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Games />
        </CartProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()
    const select = await screen.findByRole('combobox')
    await user.selectOptions(select, 'Sandbox')

    await waitFor(() => {
      expect(screen.getByText('Minecraft')).toBeInTheDocument()
    })
  })
})