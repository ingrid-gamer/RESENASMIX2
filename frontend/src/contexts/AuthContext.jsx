import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('resenasmixx.user')) || null } catch { return null }
  })

  async function login(credentials) {
    const result = await loginUser(credentials)
    window.localStorage.setItem('resenasmixx.token', result.token)
    window.localStorage.setItem('resenasmixx.user', JSON.stringify(result.user))
    setUser(result.user)
    return result.user
  }

  async function register(data) {
    return registerUser(data)
  }

  function logout() {
    window.localStorage.removeItem('resenasmixx.token')
    window.localStorage.removeItem('resenasmixx.user')
    setUser(null)
  }

  const value = { user, login, register, logout, isAdmin: user?.role === 'ROLE_ADMIN' }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
