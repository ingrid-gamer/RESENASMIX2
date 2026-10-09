import { Link } from 'react-router'
export default function NotFound() { return <div className="container"><div className="hero-panel p-5 text-center"><div className="display-3">404</div><h1 className="page-title h3">Página no encontrada</h1><p className="text-muted-soft">La ruta solicitada no existe.</p><Link to="/" className="btn btn-cyan">Volver al inicio</Link></div></div> }
