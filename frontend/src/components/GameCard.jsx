import { Link } from 'react-router'
import { useCart } from '../contexts/CartContext.jsx'

function formatPrice(value) {
  if (Number(value) === 0) return 'Gratis'
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value)
}

export default function GameCard({ game, showCartButton = true }) {
  const { addToCart } = useCart()
  const price = game.precioOferta ?? game.precio
  return (
    <article className="card-dark game-card border-0">
      <img className="card-img" src={game.imagen || '/favicon.svg'} alt={game.titulo} onError={(event) => { event.currentTarget.src = '/favicon.svg' }} />
      <div className="p-3 d-flex flex-column h-100">
        <div className="d-flex justify-content-between gap-2 mb-2">
          <span className="badge text-bg-dark border border-secondary">{game.genero}</span>
          {game.enOferta && <span className="badge text-bg-danger">Oferta</span>}
        </div>
        <Link to={`/videojuegos/${game.id}`} className="game-card-title fw-bold mb-1">{game.titulo}</Link>
        <div className="small text-muted-soft mb-3">{game.consola}</div>
        <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
          <div>
            {game.precioOferta && <div className="price-old small">{formatPrice(game.precio)}</div>}
            <div className="fw-bold text-cyan">{formatPrice(price)}</div>
          </div>
          {showCartButton && <button className="btn btn-cyan btn-sm" onClick={() => addToCart(game)}>Agregar</button>}
        </div>
      </div>
    </article>
  )
}
