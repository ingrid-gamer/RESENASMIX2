import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import GameCard from './GameCard.jsx'
import { CartProvider } from '../contexts/CartContext.jsx'

function renderCard(overrides = {}) {
  const game = { id: 1, titulo: 'GTA V', genero: 'Mundo abierto', consola: 'PS5', precio: 1000, imagen: 'image.jpg', ...overrides }
  return render(<MemoryRouter><CartProvider><GameCard game={game} /></CartProvider></MemoryRouter>)
}

describe('GameCard', () => {
  it('renderiza título y categoría', () => { renderCard(); expect(screen.getByText('GTA V')).toBeInTheDocument(); expect(screen.getByText('Mundo abierto')).toBeInTheDocument() })
  it('muestra la etiqueta oferta cuando corresponde', () => { renderCard({ enOferta: true, precioOferta: 500 }); expect(screen.getByText('Oferta')).toBeInTheDocument() })
  it('muestra gratis cuando el precio es cero', () => { renderCard({ precio: 0 }); expect(screen.getByText('Gratis')).toBeInTheDocument() })
  it('el botón agregar existe y acepta un clic', async () => { const user = userEvent.setup(); const spy = vi.spyOn(Storage.prototype, 'setItem'); renderCard(); await user.click(screen.getByRole('button', { name: 'Agregar' })); expect(spy).toHaveBeenCalled(); spy.mockRestore() })
})
