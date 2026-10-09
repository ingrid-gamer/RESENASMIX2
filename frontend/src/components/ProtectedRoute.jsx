import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return children
}
