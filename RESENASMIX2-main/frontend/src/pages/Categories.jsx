import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { listGames } from '../services/api.js'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function Categories() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { listGames().then(setGames).catch((err) => setError(err.message)).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="container"><Loading /></div>
  if (error) return <div className="container"><ErrorMessage message={error} /></div>
  const groups = [...new Set(games.map((game) => game.genero))].map((genre) => ({ genre, count: games.filter((game) => game.genero === genre).length }))
  return <div className="container"><h1 className="page-title h2">Categorías</h1><p className="text-muted-soft mb-4">Separa el catálogo por género de videojuego.</p><div className="row g-4">{groups.map((group) => <div className="col-sm-6 col-lg-4" key={group.genre}><div className="card-dark p-4"><h2 className="h5 text-cyan">{group.genre}</h2><p className="text-muted-soft">{group.count} juego(s)</p><Link to="/videojuegos" className="btn btn-outline-info btn-sm">Ver catálogo</Link></div></div>)}</div></div>
}
