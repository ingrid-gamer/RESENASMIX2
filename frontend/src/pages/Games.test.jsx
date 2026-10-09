import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { CartProvider } from '../contexts/CartContext.jsx'
import Games from './Games.jsx'

describe('Games', () => {
  it('permite buscar un videojuego por texto', async () => {
    render(<MemoryRouter><CartProvider><Games /></CartProvider></MemoryRouter>)
    const user = userEvent.setup()
    const input = screen.getByRole('textbox', { name: 'Buscar videojuego' })
    await user.type(input, 'Minecraft')
    expect(screen.getByText('Minecraft')).toBeInTheDocument()
    expect(screen.queryByText('GTA V')).not.toBeInTheDocument()
  })
  it('permite filtrar por género', async () => {
    render(<MemoryRouter><CartProvider><Games /></CartProvider></MemoryRouter>)
    const user = userEvent.setup()
    await user.selectOptions(screen.getByRole('combobox', { name: 'Filtrar género' }), 'Shooter')
    expect(screen.getByText('Valorant')).toBeInTheDocument()
    expect(screen.queryByText('Minecraft')).not.toBeInTheDocument()
  })
})
