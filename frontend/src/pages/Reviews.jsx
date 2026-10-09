import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { listGames, listReviews, addReview } from '../services/api.js'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function Reviews() {
  const { user } = useAuth()
  const [games, setGames] = useState([])
  const [reviews, setReviews] = useState([])
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({ videojuegoId: '', comentario: '', calificacion: 5 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [gamesData, reviewsData] = await Promise.all([listGames(), listReviews()])
        setGames(gamesData)
        setReviews(reviewsData)
        setForm((current) => ({ ...current, videojuegoId: current.videojuegoId || String(gamesData[0]?.id || '') }))
      } catch (err) { setError(err.message) } finally { setLoading(false) }
    }
    load()
  }, [])

  const filtered = useMemo(() => reviews.filter((review) => `${review.videojuego?.titulo || ''} ${review.usuario?.nombre || ''} ${review.comentario}`.toLowerCase().includes(query.toLowerCase())), [reviews, query])

  async function submit(event) {
    event.preventDefault(); setError(''); setMessage('')
    if (!user) { setError('Debes iniciar sesión para publicar una reseña.'); return }
    if (form.comentario.trim().length < 5) { setError('El comentario debe tener al menos 5 caracteres.'); return }
    try {
      const created = await addReview({ usuarioId: user.id || 1, videojuegoId: Number(form.videojuegoId), comentario: form.comentario.trim(), calificacion: Number(form.calificacion) })
      setReviews((current) => [...current, created])
      setForm((current) => ({ ...current, comentario: '' }))
      setMessage('Reseña publicada correctamente.')
    } catch (err) { setError(err.message) }
  }

  if (loading) return <div className="container"><Loading /></div>
  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-7">
          <h1 className="page-title h2">Reseñas</h1>
          <input className="form-control mb-3" placeholder="Buscar reseñas..." aria-label="Buscar reseñas" value={query} onChange={(event) => setQuery(event.target.value)} />
          {error && <ErrorMessage message={error} />}
          {message && <div className="alert alert-success" role="alert">{message}</div>}
          <div className="d-grid gap-3">{filtered.map((review) => <article className="card-dark p-3" key={review.id}><div className="rating-stars">{'★'.repeat(review.calificacion)}{'☆'.repeat(5-review.calificacion)}</div><h2 className="h6 mb-1">{review.videojuego?.titulo}</h2><p className="mb-2 text-muted-soft">{review.comentario}</p><small className="text-secondary">Por {review.usuario?.nombre}</small></article>)}</div>
        </div>
        <div className="col-lg-5">
          <div className="form-panel p-4 sticky-lg-top" style={{ top: '90px' }}>
            <h2 className="h5">Publicar reseña</h2>
            {!user && <p className="small text-muted-soft">Inicia sesión para publicar. El videojuego siempre se selecciona desde el catálogo.</p>}
            <form onSubmit={submit}>
              <label className="form-label" htmlFor="gameReview">Videojuego</label>
              <select id="gameReview" className="form-select mb-3" value={form.videojuegoId} onChange={(e) => setForm({ ...form, videojuegoId: e.target.value })}>{games.map((game) => <option value={game.id} key={game.id}>{game.titulo}</option>)}</select>
              <label className="form-label" htmlFor="ratingReview">Calificación</label>
              <select id="ratingReview" className="form-select mb-3" value={form.calificacion} onChange={(e) => setForm({ ...form, calificacion: e.target.value })}><option value="5">5 - Excelente</option><option value="4">4 - Muy buena</option><option value="3">3 - Buena</option><option value="2">2 - Regular</option><option value="1">1 - Mala</option></select>
              <label className="form-label" htmlFor="commentReview">Comentario</label>
              <textarea id="commentReview" className="form-control mb-3" rows="5" value={form.comentario} onChange={(e) => setForm({ ...form, comentario: e.target.value })} placeholder="Escribe tu opinión..." />
              <button className="btn btn-cyan w-100" type="submit" disabled={!user}>Publicar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
