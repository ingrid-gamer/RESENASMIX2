import { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, refreshSession, registerUser, USE_BACKEND } from '../services/api.js'

const AuthContext = createContext(null)
const TOKEN_KEY = 'resenasmixx.token'
const USER_KEY = 'resenasmixx.user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restaurar sesión persistida en localStorage al recargar la página (IE3.3.2)
  useEffect(() => {
    let active = true

    async function restoreSession() {
      const token = window.localStorage.getItem(TOKEN_KEY)
      const storedUser = window.localStorage.getItem(USER_KEY)
      if (!token || !storedUser) {
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.removeItem(USER_KEY)
        if (active) setIsLoading(false)
        return
      }

      try {
        const parsedUser = JSON.parse(storedUser)
        if (USE_BACKEND) {
          try {
            // Renueva el JWT silenciosamente al recargar — el usuario no repite login
            const refreshed = await refreshSession()
            if (active && refreshed?.token) {
              window.localStorage.setItem(TOKEN_KEY, refreshed.token)
              window.localStorage.setItem(USER_KEY, JSON.stringify(refreshed.user))
              setUser(refreshed.user)
            }
          } catch (error) {
            if (error.status === 401) {
              // Token expirado: limpiar sesión
              window.localStorage.removeItem(TOKEN_KEY)
              window.localStorage.removeItem(USER_KEY)
            } else if (active) {
              // Backend temporalmente caído: conservar sesión local para no interrumpir al usuario
              setUser(parsedUser)
            }
          }
        } else if (active) {
          setUser(parsedUser)
        }
      } catch {
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.removeItem(USER_KEY)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    restoreSession()
    return () => { active = false }
  }, [])

  async function login(credentials) {
    const result = await loginUser(credentials)
    window.localStorage.setItem(TOKEN_KEY, result.token)
    window.localStorage.setItem(USER_KEY, JSON.stringify(result.user))
    setUser(result.user)
    return result.user
  }

  async function register(data) { return registerUser(data) }

  function logout() {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'ROLE_ADMIN',
    isVendedor: user?.role === 'ROLE_VENDEDOR',
    isAdminOrVendedor: user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_VENDEDOR',
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
