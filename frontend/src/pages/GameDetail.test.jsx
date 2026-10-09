import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { CartProvider } from '../contexts/CartContext.jsx'
import { initialGames } from '../data/mockDatabase.js'
import GameDetail from './GameDetail.jsx'

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/videojuegos/${id}`]}>
      <CartProvider>
        <Routes>
          <Route path="/videojuegos/:id" element={<GameDetail />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>,
  )
}

describe('GameDetail', () => {
  it('incluye descripciones en todos los juegos y requisitos solo para los juegos de PC indicados', () => {
    expect(initialGames).toHaveLength(10)
    expect(initialGames.every((game) => game.descripcion)).toBe(true)
    expect(initialGames.filter((game) => game.requisitosMinimos).map((game) => game.titulo)).toEqual([
      'Minecraft',
      'Valorant',
      'Call of Duty: Warzone',
      'Overwatch 2',
    ])
  })

  it('muestra la descripción antes de los requisitos mínimos de Warzone', async () => {
    const { container } = renderDetail(7)
    const descriptionHeading = await screen.findByRole('heading', { name: 'Descripción del juego' })
    const requirementsHeading = screen.getByRole('heading', { name: 'Requisitos mínimos para PC' })
    const reviewsHeading = screen.getByRole('heading', { name: 'Reseñas del juego' })
    const headings = [...container.querySelectorAll('h2')]

    expect(screen.getByText(initialGames[6].descripcion)).toBeInTheDocument()
    expect(screen.getByText('Windows 10 de 64 bits actualizado.')).toBeInTheDocument()
    expect(within(requirementsHeading.parentElement).getByRole('link', { name: 'sitio oficial' })).toHaveAttribute(
      'href',
      'https://www.callofduty.com/en/store/games/warzone',
    )
    expect(headings.indexOf(descriptionHeading)).toBeLessThan(headings.indexOf(requirementsHeading))
    expect(headings.indexOf(requirementsHeading)).toBeLessThan(headings.indexOf(reviewsHeading))
  })

  it('muestra la descripción de Resident Evil 4 sin una sección de requisitos para PC', async () => {
    renderDetail(10)

    expect(await screen.findByText(initialGames[9].descripcion)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Requisitos mínimos para PC' })).not.toBeInTheDocument()
  })
})
