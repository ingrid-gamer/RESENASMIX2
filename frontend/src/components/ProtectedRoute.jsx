import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import Loading from './Loading.jsx'

/**
 * Rutas protegidas con soporte para tres roles:
 *   adminOnly    → solo ROLE_ADMIN
 *   vendedorOnly → solo ROLE_VENDEDOR (y ROLE_ADMIN en modo consulta)
 *   (ninguno)    → cualquier usuario autenticado
 */
export default function ProtectedRoute({ children, adminOnly = false, vendedorOnly = false }) {
  const { user, isAdmin, isVendedor, isLoading } = useAuth()
  if (isLoading) return <div className="container"><Loading /></div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  if (vendedorOnly && !isVendedor && !isAdmin) return <Navigate to="/" replace />
  return children
}
