import { useEffect, useState } from 'react'
import GameCard from '../components/GameCard.jsx'
import { listGames } from '../services/api.js'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function Offers() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { listGames().then(setGames).catch((err) => setError(err.message)).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="container"><Loading /></div>
  if (error) return <div className="container"><ErrorMessage message={error} /></div>
  const offers = games.filter((game) => game.enOferta)
  return <div className="container"><h1 className="page-title h2">Ofertas</h1><p className="text-muted-soft mb-4">Juegos marcados en oferta dentro de la fuente de datos.</p><div className="row g-4">{offers.map((game) => <div className="col-sm-6 col-lg-4 col-xl-3" key={game.id}><GameCard game={game} /></div>)}</div></div>
}
