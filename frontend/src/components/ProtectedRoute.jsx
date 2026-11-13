import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import Loading from './Loading.jsx'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, isLoading } = useAuth()
  if (isLoading) return <div className="container"><Loading /></div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return children
}
