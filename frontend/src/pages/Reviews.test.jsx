import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { CartProvider } from '../contexts/CartContext.jsx'
import { AuthProvider } from '../contexts/AuthContext.jsx'
import Reviews from './Reviews.jsx'

describe('Reviews', () => {
  it('muestra reseñas cargadas desde la persistencia local', async () => {
    render(<MemoryRouter><AuthProvider><CartProvider><Reviews /></CartProvider></AuthProvider></MemoryRouter>)
    expect(await screen.findByText('Muy entretenido y con excelente jugabilidad.')).toBeInTheDocument()
  })
  it('mantiene el campo de comentario controlado', async () => {
    render(<MemoryRouter><AuthProvider><CartProvider><Reviews /></CartProvider></AuthProvider></MemoryRouter>)
    const user = userEvent.setup()
    await screen.findByText('Muy entretenido y con excelente jugabilidad.')
    const field = screen.getByLabelText('Comentario')
    await user.type(field, 'Mi comentario de prueba')
    expect(field).toHaveValue('Mi comentario de prueba')
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeDisabled()
  })
})
