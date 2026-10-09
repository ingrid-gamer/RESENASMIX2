import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { listGames } from '../services/api.js'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import GameCard from '../components/GameCard.jsx'

const explore = [
  ['https://live.staticflickr.com/8372/8553676198_4d1f4ef2a3_b.jpg', 'Los mejor calificados', 'Los juegos con las mayores calificaciones y favoritos por los usuarios.', 'success'],
  ['https://elobservadorrd.com/wp-content/uploads/2025/12/videojuegos-mas-esperados-2026-incluyen-grand-theft-auto-vi-y-wolverine-5447ac63-focus-0.08-0.31-1200-675.webp', 'Los juegos más comentados', 'Los últimos juegos que han sido más comentados.', 'info'],
  ['https://nosdicengamers.com/wp-content/uploads/2023/12/TOP-5-PEORES-JUEGOS-1024x576.jpg', 'Los peor calificados', 'Algo con estos videojuegos no anda bien según los usuarios.', 'danger'],
]

export default function Home() {
  const [games, setGames] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { listGames().then(setGames).catch((err) => setError(err.message)).finally(() => setLoading(false)) }, [])
  const orderedGames = [...games].sort((a, b) => b.id - a.id)
  const latest = showAll ? orderedGames : orderedGames.slice(0, 4)
  if (loading) return <div className="container"><Loading /></div>
  if (error) return <div className="container"><ErrorMessage message={error} /></div>
  return (
    <div className="container">
      <section className="hero-panel p-4 p-lg-5 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="page-title display-5 text-white">Hablemos de <span className="text-cyan">videojuegos.</span></h1>
            <p className="lead text-white">Opiniones reales y honestas para ayudarte a descubrir tu próxima gran aventura digital</p>
            <p className="text-white">Explora juegos, categorías, ofertas y reseñas de la comunidad.</p>
            <Link to="/videojuegos" className="btn btn-cyan">Explorar videojuegos!</Link>
          </div>
          <div className="col-lg-6 hero-video">
            <iframe src="https://www.youtube.com/embed/Fh4TPvNjUjM" title="Video de inicio ResenasMIXX" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0 text-white">Explora</h2>
          <Link to="/resenas" className="small text-cyan">Ver reseñas</Link>
        </div>
        <div className="row g-4">
          {explore.map(([image, title, text, tone]) => (
            <div className="col-md-4" key={title}>
              <article className="card-dark border-0">
                <img className="card-img" src={image} alt={title} />
                <div className="p-3">
                  <h3 className={`h6 text-${tone} fw-bold`}>{title}</h3>
                  <p className="small text-muted-soft mb-0">{text}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="hero-panel p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div><h2 className="h4 mb-1 text-white">Últimos juegos disponibles</h2></div>
          <Link to="/videojuegos" className="btn btn-outline-info btn-sm">Ver todos</Link>
        </div>
        <div className="row g-4">
          {latest.map((game) => <div className="col-12 col-sm-6 col-lg-3" key={game.id}><GameCard game={game} /></div>)}
        </div>
        {games.length > 4 && <button className="btn btn-outline-light d-block mx-auto mt-4" onClick={() => setShowAll((current) => !current)}>{showAll ? 'Ver menos juegos' : 'Ver más juegos'}</button>}
      </section>
    </div>
  )
}
