import { Link, useParams } from 'react-router'
import { getAverageRating, initialGames } from '../data/mockDatabase.js'
import { listReviews, readGame } from '../services/api.js'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading.jsx'
import { useCart } from '../contexts/CartContext.jsx'

export default function GameDetail() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()
  useEffect(() => { Promise.all([readGame(id), listReviews()]).then(([gameData, reviewData]) => { setGame(gameData); setReviews(reviewData) }).catch((err) => setError(err.message)).finally(() => setLoading(false)) }, [id])
  if (loading) return <div className="container"><Loading /></div>
  if (error) return <div className="container"><div className="alert alert-danger">{error}</div></div>
  if (!game) return <div className="container"><div className="alert alert-danger">Videojuego no encontrado.</div><Link to="/videojuegos" className="btn btn-outline-info">Volver al catálogo</Link></div>
  const gameReviews = reviews.filter((review) => Number(review.videojuego?.id) === Number(id))
  const average = getAverageRating(reviews, id)
  const catalogInfo = initialGames.find((item) => item.titulo === game.titulo)
  const description = game.descripcion || catalogInfo?.descripcion
  const requirements = game.requisitosMinimos || catalogInfo?.requisitosMinimos
  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-6"><img src={game.imagen} className="w-100 rounded-4" alt={game.titulo} /></div>
        <div className="col-lg-6">
          <span className="badge text-bg-dark border border-secondary">{game.genero}</span>
          <h1 className="page-title h2 mt-2">{game.titulo}</h1>
          <p className="text-muted-soft">Disponible para {game.consola}.</p>
          <div className="rating-stars mb-3" aria-label={`Calificación promedio ${average.toFixed(1)} de 5`}>{average ? `★★★★★ ${average.toFixed(1)}/5` : 'Sin calificaciones aún'}</div>
          <p className="display-6 fw-bold text-cyan">{game.precio === 0 ? 'Gratis' : `$${(game.precioOferta ?? game.precio).toLocaleString('es-CL')}`}</p>
          <button className="btn btn-cyan me-2" onClick={() => addToCart(game)}>Agregar al carrito</button>
          <Link to="/resenas" className="btn btn-outline-light">Ver reseñas</Link>
        </div>
      </div>
      {description && <section className="hero-panel p-4 mt-5">
        <h2 className="h5">Descripción del juego</h2>
        <p className="text-muted-soft mb-0">{description}</p>
      </section>}
      {requirements && <section className="hero-panel p-4 mt-4">
        <h2 className="h5">Requisitos mínimos para PC</h2>
        {requirements.edicion && <p className="text-muted-soft">{requirements.edicion}</p>}
        <dl className="row mb-2">
          {[
            ['Sistema operativo', requirements.sistemaOperativo],
            ['Procesador', requirements.procesador],
            ['Memoria RAM', requirements.memoria],
            ['Tarjeta gráfica', requirements.tarjetaGrafica],
            ['Almacenamiento', requirements.almacenamiento],
            ['Otros', requirements.otros],
          ].filter(([, value]) => value).map(([label, value]) => (
            <div className="col-md-6 mb-3" key={label}>
              <dt className="text-white">{label}</dt>
              <dd className="text-muted-soft mb-0">{value}</dd>
            </div>
          ))}
        </dl>
        {requirements.fuente && <p className="small text-muted-soft mb-1">Fuente: <a href={requirements.fuente} target="_blank" rel="noreferrer" className="text-cyan">sitio oficial</a></p>}
        {requirements.notaFuente && <p className="small text-muted-soft mb-0">{requirements.notaFuente}</p>}
      </section>}
      <section className="hero-panel p-4 mt-5">
        <h2 className="h5">Reseñas del juego</h2>
        {gameReviews.length ? gameReviews.map((review) => <div className="border-top border-secondary py-3" key={review.id}><div className="rating-stars">{'★'.repeat(review.calificacion)}{'☆'.repeat(5-review.calificacion)}</div><strong>{review.usuario?.nombre}</strong><p className="mb-0 text-muted-soft">{review.comentario}</p></div>) : <p className="text-muted-soft mb-0">Todavía no hay reseñas para este juego.</p>}
      </section>
    </div>
  )
}
