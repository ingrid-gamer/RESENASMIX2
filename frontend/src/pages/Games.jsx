import { useEffect, useMemo, useState } from 'react'
import GameCard from '../components/GameCard.jsx'
import { searchGames } from '../data/mockDatabase.js'
import { listGames } from '../services/api.js'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function Games() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  useEffect(() => { listGames().then(setGames).catch((err) => setError(err.message)).finally(() => setLoading(false)) }, [])
  const genres = ['Todos', ...new Set(games.map((game) => game.genero))]
  const filtered = useMemo(() => searchGames(games, query).filter((game) => genre === 'Todos' || game.genero === genre), [games, query, genre])
  if (loading) return <div className="container"><Loading /></div>
  if (error) return <div className="container"><ErrorMessage message={error} /></div>
  return (
    <div className="container">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div><h1 className="page-title h2">Videojuegos</h1><p className="text-muted-soft mb-0">Busca por título, género o consola.</p></div>
        <LinkToCatalog count={games.length} />
      </div>
      <div className="row g-2 mb-4">
        <div className="col-lg-7"><input className="form-control" placeholder="Buscar videojuego..." aria-label="Buscar videojuego" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <div className="col-lg-5"><select className="form-select" aria-label="Filtrar género" value={genre} onChange={(event) => setGenre(event.target.value)}>{genres.map((item) => <option key={item}>{item}</option>)}</select></div>
      </div>
      <div className="row g-4">
        {filtered.length ? filtered.map((game) => <div className="col-sm-6 col-lg-4 col-xl-3" key={game.id}><GameCard game={game} /></div>) : <div className="col-12"><div className="alert alert-secondary">No hay videojuegos que coincidan con la búsqueda.</div></div>}
      </div>
    </div>
  )
}

function LinkToCatalog({ count }) { return <span className="small text-muted-soft">{count} juegos cargados</span> }
