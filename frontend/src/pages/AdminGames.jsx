import { useEffect, useState } from 'react'
import { addGame, editGame, listGames, removeGame } from '../services/api.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

const EMPTY_FORM = {
  titulo: '', genero: '', consola: '', precio: 0, enOferta: false,
  precioOferta: '', imagen: '', descripcion: '', requisitosMinimos: null,
}

export default function AdminGames() {
  const { isAdmin, user } = useAuth()
  const [games, setGames] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user && isAdmin) listGames().then(setGames).catch((err) => setError(err.message))
  }, [user, isAdmin])

  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  function reset() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setError('')
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (form.enOferta && (!form.precioOferta || Number(form.precioOferta) > Number(form.precio))) {
      setError('El precio de oferta debe existir y no superar el precio normal.')
      return
    }

    const payload = {
      ...form,
      precio: Number(form.precio),
      precioOferta: form.enOferta ? Number(form.precioOferta) : null,
      enOferta: Boolean(form.enOferta),
      descripcion: form.descripcion.trim() || null,
    }

    setSaving(true)
    try {
      const saved = editingId
        ? await editGame(editingId, payload)
        : await addGame(payload)
      setGames((current) => editingId
        ? current.map((game) => Number(game.id) === Number(editingId) ? saved : game)
        : [...current, saved])
      reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function edit(game) {
    setEditingId(game.id)
    setForm({ ...EMPTY_FORM, ...game, precioOferta: game.precioOferta ?? '' })
    setError('')
  }

  async function remove(id) {
    if (!window.confirm('¿Eliminar este videojuego?')) return
    try {
      await removeGame(id)
      setGames((current) => current.filter((game) => Number(game.id) !== Number(id)))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <h1 className="page-title h2">CRUD de videojuegos</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="form-panel p-4 mb-4">
        <form onSubmit={submit}>
          <div className="row g-2">
            <div className="col-md-6"><label className="form-label" htmlFor="game-title">Título</label><input id="game-title" className="form-control" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required /></div>
            <div className="col-md-3"><label className="form-label" htmlFor="game-genre">Género</label><input id="game-genre" className="form-control" value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })} required /></div>
            <div className="col-md-3"><label className="form-label" htmlFor="game-console">Consola</label><input id="game-console" className="form-control" value={form.consola} onChange={(e) => setForm({ ...form, consola: e.target.value })} required /></div>
            <div className="col-md-3"><label className="form-label" htmlFor="game-price">Precio CLP</label><input id="game-price" className="form-control" type="number" min="0" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required /></div>
            <div className="col-md-3"><label className="form-label" htmlFor="game-sale-price">Precio oferta CLP</label><input id="game-sale-price" className="form-control" type="number" min="0" value={form.precioOferta} onChange={(e) => setForm({ ...form, precioOferta: e.target.value })} disabled={!form.enOferta} /></div>
            <div className="col-md-6"><label className="form-label" htmlFor="game-image">URL imagen</label><input id="game-image" className="form-control" type="url" value={form.imagen || ''} onChange={(e) => setForm({ ...form, imagen: e.target.value })} /></div>
            <div className="col-12"><label className="form-label" htmlFor="game-description">Descripción</label><textarea id="game-description" className="form-control" rows="3" value={form.descripcion || ''} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} /></div>
            <div className="col-12"><div className="form-check mt-2"><input id="offer" className="form-check-input" type="checkbox" checked={Boolean(form.enOferta)} onChange={(e) => setForm({ ...form, enOferta: e.target.checked, precioOferta: e.target.checked ? form.precioOferta : '' })} /><label className="form-check-label" htmlFor="offer">Videojuego en oferta</label></div></div>
          </div>
          <div className="mt-3"><button className="btn btn-cyan me-2" disabled={saving}>{saving ? 'Guardando…' : editingId ? 'Actualizar' : 'Crear videojuego'}</button><button type="button" className="btn btn-outline-secondary" onClick={reset}>Limpiar</button></div>
        </form>
      </div>
      <div className="table-dark-panel table-responsive">
        <table className="table align-middle"><thead><tr><th>ID</th><th>Título</th><th>Género</th><th>Consola</th><th>Precio</th><th>Acciones</th></tr></thead>
          <tbody>{games.map((game) => <tr key={game.id}><td>{game.id}</td><td>{game.titulo}</td><td>{game.genero}</td><td>{game.consola}</td><td>${Number(game.enOferta && game.precioOferta != null ? game.precioOferta : game.precio).toLocaleString('es-CL')}</td><td><button className="btn btn-outline-info btn-sm me-2" onClick={() => edit(game)}>Editar</button><button className="btn btn-outline-danger btn-sm" onClick={() => remove(game.id)}>Eliminar</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
