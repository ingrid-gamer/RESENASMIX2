import { describe, expect, it } from 'vitest'
import { createReview, getAverageRating, getReviews } from './mockDatabase.js'

describe('review persistence', () => {
  it('crea una reseña asociada a usuario y videojuego', () => {
    const created = createReview({ usuarioId: 1, videojuegoId: 1, comentario: 'Excelente', calificacion: 5 })
    expect(created.videojuego.titulo).toBe('GTA V')
    expect(getReviews()).toHaveLength(7)
  })
  it('calcula el promedio del videojuego', () => {
    expect(getAverageRating(getReviews(), 1)).toBe(5)
  })
})
