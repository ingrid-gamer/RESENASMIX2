import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { listGames, listReviews, listUsers } from '../services/api.js'
import Loading from '../components/Loading.jsx'

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth()
  const [stats, setStats] = useState({ games: 0, reviews: 0, users: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function loadStats() {
      if (!user || !isAdmin) {
        if (active) setLoading(false)
        return
      }
      try {
        const [games, reviews, users] = await Promise.all([listGames(), listReviews(), listUsers()])
        if (active) setStats({ games: games.length, reviews: reviews.length, users: users.length })
      } catch (requestError) {
        if (active) setError(requestError.message || 'No fue posible cargar las estadísticas.')
      } finally {
        if (active) setLoading(false)
      }
    }
    loadStats()
    return () => { active = false }
  }, [user, isAdmin])

  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  if (loading) return <div className="container"><Loading /></div>

  return (
    <div className="container">
      <h1 className="page-title h2">Panel administrativo</h1>
      <p className="text-muted-soft">Administración del catálogo, reseñas y usuarios registrados.</p>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="row g-4 mb-4">
        <Stat title="Videojuegos" value={stats.games} />
        <Stat title="Reseñas" value={stats.reviews} />
        <Stat title="Usuarios" value={stats.users} />
      </div>
      <div className="row g-3">
        <div className="col-md-6"><Link className="btn btn-outline-info w-100 py-3" to="/admin/videojuegos">Administrar videojuegos</Link></div>
        <div className="col-md-6"><Link className="btn btn-outline-info w-100 py-3" to="/admin/resenas">Administrar reseñas</Link></div>
      </div>
    </div>
  )
}

function Stat({ title, value }) {
  return <div className="col-md-4"><div className="card-dark p-4"><div className="text-muted-soft">{title}</div><div className="display-6 fw-bold text-cyan">{value}</div></div></div>
}
