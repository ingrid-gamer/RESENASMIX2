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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8083'
export const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true'

async function request(path, options = {}) {
  const token = window.localStorage.getItem('resenasmixx.token')
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `Error HTTP ${response.status}`)
  }
  if (response.status === 204) return null
  return response.json()
}

export async function loginUser(credentials) {
  if (!USE_BACKEND) {
    const user = getUserByUsername(credentials.username)
    if (!user || user.password !== credentials.password) throw new Error('Credenciales incorrectas')
    return { token: `mock-token-${user.id}`, user: { id: user.id, nombre: user.nombre, username: user.username, email: user.email, role: user.role } }
  }
  const data = await request('/api/v1/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
  const payload = JSON.parse(atob(data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
  return { token: data.token, user: { id: data.userId, username: data.username || payload.sub, nombre: data.nombre, email: data.email, role: data.role || payload.role || 'ROLE_USER' } }
}

export async function registerUser(userData) {
  if (!USE_BACKEND) return createUser(userData)
  await request('/api/v1/auth/register', { method: 'POST', body: JSON.stringify(userData) })
  return userData
}

export async function listGames() { return USE_BACKEND ? request('/videojuegos') : getGames() }
export async function readGame(id) { return USE_BACKEND ? request(`/videojuegos/${id}`) : getGameById(id) }
export async function addGame(data) { return USE_BACKEND ? request('/videojuegos', { method: 'POST', body: JSON.stringify(data) }) : createGame(data) }
export async function editGame(id, data) { return USE_BACKEND ? request(`/videojuegos/${id}`, { method: 'PUT', body: JSON.stringify(data) }) : updateGame(id, data) }
export async function removeGame(id) { return USE_BACKEND ? request(`/videojuegos/${id}`, { method: 'DELETE' }) : deleteGame(id) }

export async function listReviews() { return USE_BACKEND ? request('/resenas') : getReviews() }
export async function addReview(data) { return USE_BACKEND ? request('/resenas', { method: 'POST', body: JSON.stringify(data) }) : createReview(data) }
export async function editReview(id, data) { return USE_BACKEND ? request(`/resenas/${id}`, { method: 'PUT', body: JSON.stringify(data) }) : updateReview(id, data) }
export async function removeReview(id) { return USE_BACKEND ? request(`/resenas/${id}`, { method: 'DELETE' }) : deleteReview(id) }
export async function listUsers() { return USE_BACKEND ? request('/usuarios') : getUsers() }

export async function listFreeGames() {
  if (USE_BACKEND) return request('/api/v1/juegos-gratis')
  return getGames().filter((game) => game.precio === 0)
}
