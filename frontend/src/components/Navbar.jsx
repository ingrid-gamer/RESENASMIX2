import { NavLink, Link } from 'react-router-dom'
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
  const { user, isAdmin, isVendedor, logout } = useAuth()
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
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className="nav-link nav-link-custom">{label}</NavLink>
            ))}
            {/* Administración: solo visible para ADMIN */}
            {isAdmin && (
              <NavLink to="/admin" className="nav-link nav-link-custom">Administración</NavLink>
            )}
            {/* Panel Vendedor: solo visible para VENDEDOR (acceso restringido) */}
            {isVendedor && !isAdmin && (
              <NavLink to="/vendedor" className="nav-link nav-link-custom">Panel Vendedor</NavLink>
            )}
          </div>
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Carrito: no visible para vendedores (solo consultan órdenes) */}
            {!isVendedor && (
              <Link className="btn btn-outline-info btn-sm" to="/carrito">
                🛒 Carrito <span className="badge text-bg-info ms-1">{count()}</span>
              </Link>
            )}
            {user ? (
              <>
                <span className="small text-muted-soft d-none d-md-inline">
                  Hola, {user.nombre || user.username}
                  {isVendedor && <span className="badge bg-warning text-dark ms-1">Vendedor</span>}
                  {isAdmin && <span className="badge bg-danger ms-1">Admin</span>}
                </span>
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
