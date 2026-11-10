import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { CartProvider } from '../contexts/CartContext.jsx'
import { AuthProvider } from '../contexts/AuthContext.jsx'
import Home from './Home.jsx'

describe('Home', () => {
  it('renderiza el mensaje principal y los juegos recientes', async () => {
    render(<MemoryRouter><AuthProvider><CartProvider><Home /></CartProvider></AuthProvider></MemoryRouter>)
    expect(await screen.findByRole('heading', { name: /Hablemos de videojuegos/i })).toBeInTheDocument()
    expect(await screen.findByText('Opiniones reales y honestas para ayudarte a descubrir tu próxima gran aventura digital')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explorar videojuegos!' })).toBeInTheDocument()
    expect(await screen.findByText('Últimos juegos disponibles')).toBeInTheDocument()
    expect(await screen.findByText('Resident Evil 4')).toBeInTheDocument()
    expect(screen.queryByText('RESENAS MIXX')).not.toBeInTheDocument()
    expect(screen.queryByText('Datos iniciales de la persistencia simulada.')).not.toBeInTheDocument()
  })
})
