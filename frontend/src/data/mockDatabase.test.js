import { describe, expect, it } from 'vitest'
import { createGame, deleteGame, getGames, searchGames, updateGame } from './mockDatabase.js'

describe('mockDatabase', () => {
  it('crea un videojuego y genera un id', () => {
    const created = createGame({ titulo: 'Nuevo', genero: 'Aventura', consola: 'PC' })
    expect(created.id).toBe(11)
    expect(getGames()).toHaveLength(11)
  })
  it('actualiza un videojuego sin cambiar su id', () => {
    const updated = updateGame(1, { titulo: 'GTA V Editado' })
    expect(updated.titulo).toBe('GTA V Editado')
    expect(updated.id).toBe(1)
  })
  it('elimina un videojuego', () => {
    deleteGame(1)
    expect(getGames().some((game) => game.id === 1)).toBe(false)
  })
  it('filtra por título, género o consola', () => {
    const result = searchGames(getGames(), 'shooter')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((game) => game.genero === 'Shooter')).toBe(true)
  })
})
