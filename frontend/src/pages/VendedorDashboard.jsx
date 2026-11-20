import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { listGames } from '../services/api.js'
import Loading from '../components/Loading.jsx'

/**
 * Panel de Vendedor — acceso restringido según rúbrica IE3.3.6.
 * El vendedor puede:
 *   - Ver lista y detalle de productos (videojuegos)
 *   - Ver lista de órdenes (compras) de cualquier usuario
 * El vendedor NO puede:
 *   - Gestionar usuarios
 *   - Eliminar o editar reseñas
 *   - Acceder al panel de Administrador
 */
export default function VendedorDashboard() {
  const { user, isVendedor, isAdmin, isLoading } = useAuth()
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    listGames()
      .then(setGames)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [user])

  if (isLoading) return <div className="container"><Loading /></div>
  if (!user) return <Navigate to="/login" replace />
  // Solo vendedores (y admins en modo de consulta) pueden ver este panel
  if (!isVendedor && !isAdmin) return <Navigate to="/" replace />
  if (loading) return <div className="container"><Loading /></div>

  return (
    <div className="container">
      <h1 className="page-title h2">Panel del Vendedor</h1>
      <p className="text-muted-soft">
        Consulta el catálogo de productos y el estado de las órdenes registradas.
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card-dark p-4">
            <div className="text-muted-soft">Videojuegos en catálogo</div>
            <div className="display-6 fw-bold text-cyan">{games.length}</div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <Link className="btn btn-outline-info w-100 py-3" to="/videojuegos">
            Ver catálogo de productos
          </Link>
        </div>
      </div>

      <h2 className="h5 mt-4">Catálogo de productos</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Oferta</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => (
              <tr key={g.id}>
                <td>{g.id}</td>
                <td>
                  <Link to={`/videojuegos/${g.id}`} className="text-info">{g.titulo}</Link>
                </td>
                <td>{g.categoria || '—'}</td>
                <td>${Number(g.precio).toLocaleString('es-CL')}</td>
                <td>{g.enOferta ? <span className="badge bg-warning text-dark">En oferta</span> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
