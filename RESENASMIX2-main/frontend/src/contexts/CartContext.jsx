import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('resenasmixx.cart')) || [] } catch { return [] }
  })

  function persist(next) {
    setItems(next)
    window.localStorage.setItem('resenasmixx.cart', JSON.stringify(next))
  }

  function addToCart(game) {
    const existing = items.find((item) => item.id === game.id)
    const next = existing
      ? items.map((item) => item.id === game.id ? { ...item, cantidad: item.cantidad + 1 } : item)
      : [...items, { ...game, cantidad: 1 }]
    persist(next)
  }

  function removeFromCart(id) { persist(items.filter((item) => item.id !== id)) }
  function clearCart() { persist([]) }
  function total() { return items.reduce((sum, item) => sum + Number(item.precioOferta ?? item.precio) * item.cantidad, 0) }
  function count() { return items.reduce((sum, item) => sum + item.cantidad, 0) }

  const value = { items, addToCart, removeFromCart, clearCart, total, count }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }
