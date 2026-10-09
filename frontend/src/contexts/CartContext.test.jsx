import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext.jsx'

describe('CartContext', () => {
  it('agrega un producto y calcula cantidad', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })
    act(() => result.current.addToCart({ id: 1, titulo: 'GTA V', precio: 1000 }))
    expect(result.current.count()).toBe(1)
    expect(result.current.total()).toBe(1000)
  })
})
