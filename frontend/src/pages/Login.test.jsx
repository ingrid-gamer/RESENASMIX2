import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { AuthProvider } from '../contexts/AuthContext.jsx'
import Login from './Login.jsx'

describe('Login', () => {
  it('permite escribir usuario y contraseña', async () => {
    render(<MemoryRouter><AuthProvider><Login /></AuthProvider></MemoryRouter>)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Usuario'), 'ingrid')
    await user.type(screen.getByLabelText('Contraseña'), '123456')
    expect(screen.getByLabelText('Usuario')).toHaveValue('ingrid')
    expect(screen.getByLabelText('Contraseña')).toHaveValue('123456')
  })
  it('muestra error con credenciales incorrectas', async () => {
    render(<MemoryRouter><AuthProvider><Login /></AuthProvider></MemoryRouter>)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Usuario'), 'nadie')
    await user.type(screen.getByLabelText('Contraseña'), 'xxxxxx')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(await screen.findByText('Credenciales incorrectas')).toBeInTheDocument()
  })
})
