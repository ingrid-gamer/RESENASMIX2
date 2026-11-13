import { Link } from 'react-router-dom'

export default function PurchaseSuccess() {
  let purchase = null
  try { purchase = JSON.parse(window.localStorage.getItem('resenasmixx.lastPurchase')) } catch { /* resumen local no disponible */ }

  return (
    <div className="container">
      <div className="hero-panel p-5 text-center">
        <div className="display-4">✅</div>
        <h1 className="page-title h2 mt-3">Compra registrada</h1>
        <p className="text-muted-soft">
          {purchase?.persistidaEnBackend
            ? `La compra demostrativa quedó registrada en el backend. Número: ${purchase.compraId}.`
            : 'La compra simulada quedó guardada localmente en este navegador; no existe un pedido persistido en el backend.'}
        </p>
        <Link to="/videojuegos" className="btn btn-cyan">Seguir explorando</Link>
      </div>
    </div>
  )
}
