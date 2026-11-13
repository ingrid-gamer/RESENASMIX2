import {
  createGame,
  createReview,
  createUser,
  deleteGame,
  deleteReview,
  getGameById,
  getGames,
  getReviews,
  getUsers,
  getUserByUsername,
  updateGame,
  updateReview,
} from '../data/mockDatabase.js'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8083').replace(/\/$/, '')
export const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true'

async function request(path, options = {}) {
  const token = window.localStorage.getItem('resenasmixx.token')
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  const bodyText = response.status === 204 ? '' : await response.text()
  if (!response.ok) {
    let message = bodyText || `Error HTTP ${response.status}`
    try {
      const payload = JSON.parse(bodyText)
      message = payload.message || payload.error || message
    } catch { /* respuestas text/plain, por ejemplo el registro */ }
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  if (!bodyText) return null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return JSON.parse(bodyText)
  return bodyText
}

export async function loginUser(credentials) {
  if (!USE_BACKEND) {
    const user = getUserByUsername(credentials.username)
    if (!user || user.password !== credentials.password) throw new Error('Credenciales incorrectas')
    return {
      token: `mock-token-${user.id}`,
      user: { id: user.id, nombre: user.nombre, username: user.username, email: user.email, role: user.role },
    }
  }

  const data = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username: credentials.username, password: credentials.password }),
  })
  return {
    token: data.token,
    user: {
      id: data.userId,
      username: data.username,
      nombre: data.nombre,
      email: data.email,
      role: data.role || 'ROLE_USER',
    },
    expiresInSeconds: data.expiresInSeconds,
  }
}

export async function refreshSession() {
  if (!USE_BACKEND) return null
  const data = await request('/api/v1/auth/refresh', { method: 'POST' })
  return {
    token: data.token,
    user: {
      id: data.userId,
      username: data.username,
      nombre: data.nombre,
      email: data.email,
      role: data.role || 'ROLE_USER',
    },
    expiresInSeconds: data.expiresInSeconds,
  }
}

export async function registerUser(userData) {
  if (!USE_BACKEND) return createUser(userData)
  return request('/api/v1/auth/register', { method: 'POST', body: JSON.stringify(userData) })
}

export async function listGames() { return USE_BACKEND ? request('/videojuegos') : getGames() }
export async function readGame(id) { return USE_BACKEND ? request(`/videojuegos/${id}`) : getGameById(id) }
export async function addGame(data) { return USE_BACKEND ? request('/videojuegos', { method: 'POST', body: JSON.stringify(data) }) : createGame(data) }
export async function editGame(id, data) { return USE_BACKEND ? request(`/videojuegos/${id}`, { method: 'PUT', body: JSON.stringify(data) }) : updateGame(id, data) }
export async function removeGame(id) { return USE_BACKEND ? request(`/videojuegos/${id}`, { method: 'DELETE' }) : deleteGame(id) }

export async function listReviews() { return USE_BACKEND ? request('/resenas') : getReviews() }
export async function addReview(data) {
  if (!USE_BACKEND) return createReview(data)
  // El backend obtiene el autor desde el JWT; no se envía usuarioId desde el navegador.
  const { videojuegoId, comentario, calificacion } = data
  return request('/resenas', {
    method: 'POST',
    body: JSON.stringify({ videojuegoId, comentario, calificacion }),
  })
}
export async function editReview(id, data) { return USE_BACKEND ? request(`/resenas/${id}`, { method: 'PUT', body: JSON.stringify(data) }) : updateReview(id, data) }
export async function removeReview(id) { return USE_BACKEND ? request(`/resenas/${id}`, { method: 'DELETE' }) : deleteReview(id) }
export async function listUsers() { return USE_BACKEND ? request('/usuarios') : getUsers() }

export async function listFreeGames() {
  if (USE_BACKEND) return request('/api/v1/juegos-gratis')
  return getGames().filter((game) => Number(game.precio) === 0)
}

// Registra una compra demostrativa; el backend calcula el total usando sus propios precios.
export async function createPurchase(data) {
  if (!USE_BACKEND) return null
  return request('/api/v1/compras', { method: 'POST', body: JSON.stringify(data) })
}
