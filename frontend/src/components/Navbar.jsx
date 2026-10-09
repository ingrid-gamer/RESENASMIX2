import { NavLink, Link } from 'react-router'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useCart } from '../contexts/CartContext.jsx'

const navItems = [
  ['/', 'Inicio', true],
  ['/videojuegos', 'Videojuegos'],
  ['/categorias', 'Categorías'],
  ['/ofertas', 'Ofertas'],
  ['/resenas', 'Reseñas'],
]

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const { count } = useCart()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark-custom sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold text-cyan" to="/">🎮 ResenasMIXX</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <div className="navbar-nav me-auto">
            {navItems.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className="nav-link nav-link-custom">{label}</NavLink>)}
            {isAdmin && <NavLink to="/admin" className="nav-link nav-link-custom">Administración</NavLink>}
          </div>
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Link className="btn btn-outline-info btn-sm" to="/carrito">🛒 Carrito <span className="badge text-bg-info ms-1">{count()}</span></Link>
            {user ? (
              <>
                <span className="small text-muted-soft d-none d-md-inline">Hola, {user.nombre || user.username}</span>
                <button className="btn btn-outline-light btn-sm" onClick={logout}>Salir</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                <Link className="btn btn-cyan btn-sm" to="/registro">Registro</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
