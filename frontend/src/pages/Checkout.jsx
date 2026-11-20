import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useCart } from '../contexts/CartContext.jsx'
import { createPurchase, USE_BACKEND } from '../services/api.js'

export default function Checkout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    direccion: '',
    entrega: 'Estándar',
  })

  async function submit(event) {
    event.preventDefault()
    if (!items.length || !form.direccion.trim()) {
      setError('Agrega productos al carrito e ingresa una dirección.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      const purchase = await createPurchase({
        ...form,
        items: items.map((item) => ({
          videojuegoId: Number(item.id),
          cantidad: Number(item.cantidad),
        })),
      })

      const summary = {
        ...form,
        total: Number(purchase?.total ?? total()),
        fecha: new Date().toISOString(),
        compraId: purchase?.id ?? null,
        estado: purchase?.estado ?? 'SIMULADA_LOCAL',
        persistidaEnBackend: Boolean(purchase?.id),
      }
      window.localStorage.setItem('resenasmixx.lastPurchase', JSON.stringify(summary))
      clearCart()
      navigate('/compra-exitosa')
    } catch (requestError) {
      setError(requestError.message || 'No fue posible registrar la compra.')
      navigate('/compra-fallida', { state: { error: requestError.message } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container">
      <h1 className="page-title h2">Checkout</h1>
      <p className="text-muted-soft">Los datos disponibles de la sesión se cargan automáticamente.</p>
      <div className="row g-4">
        <div className="col-lg-7">
          <form className="form-panel p-4" onSubmit={submit}>
            <label className="form-label" htmlFor="checkout-nombre">Nombre</label>
            <input id="checkout-nombre" className="form-control mb-3" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            <label className="form-label" htmlFor="checkout-email">Email</label>
            <input id="checkout-email" type="email" className="form-control mb-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <label className="form-label" htmlFor="checkout-direccion">Dirección de envío</label>
            <textarea id="checkout-direccion" className="form-control mb-3" rows="3" value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} required />
            <label className="form-label" htmlFor="checkout-entrega">Entrega</label>
            <select id="checkout-entrega" className="form-select mb-4" value={form.entrega} onChange={(e) => setForm({ ...form, entrega: e.target.value })}>
              <option>Estándar</option><option>Express</option>
            </select>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {!USE_BACKEND && <div className="alert alert-warning">Modo local: la compra solo se guardará en este navegador.</div>}
            <button className="btn btn-cyan w-100" disabled={submitting || !items.length}>
              {submitting ? 'Registrando...' : 'Confirmar compra simulada'}
            </button>
          </form>
        </div>
        <div className="col-lg-5">
          <div className="hero-panel p-4">
            <h2 className="h5">Resumen</h2>
            <p className="text-muted-soft">{items.length} producto(s)</p>
            <div className="display-6 fw-bold text-cyan">${total().toLocaleString('es-CL')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
