const STORAGE_KEYS = {
  games: 'resenasmixx.games',
  reviews: 'resenasmixx.reviews',
  users: 'resenasmixx.users',
}

export const initialGames = [
  {
    id: 1, titulo: 'GTA V', genero: 'Mundo abierto', consola: 'PS5', precio: 24990, precioOferta: 14990, enOferta: true,
    imagen: 'https://i.blogs.es/4a6a62/gta-v-especial-10-anos/1366_521.jpeg',
    descripcion: 'Explora Los Santos a través de las historias de Michael, Franklin y Trevor. Realiza misiones, participa en persecuciones, recorre la ciudad y descubre actividades en un mundo abierto lleno de posibilidades.',
  },
  {
    id: 2, titulo: 'Minecraft', genero: 'Sandbox', consola: 'PC', precio: 19990, enOferta: false,
    imagen: 'https://r2.gem-awards.com/news/67f41076950961.50166997.png',
    descripcion: 'Un juego de bloques donde puedes construir, explorar y crear prácticamente cualquier cosa. Recolecta materiales, fabrica herramientas, descubre biomas y enfréntate a criaturas en supervivencia o construye libremente en modo creativo.',
    requisitosMinimos: {
      edicion: 'Java para PC',
      sistemaOperativo: 'Windows 10 de 64 bits, Windows en ARM, macOS 12 o posterior, o Linux de 64 bits.',
      procesador: 'Intel Core i3-10100, AMD Ryzen 3 3100 o equivalente compatible.',
      memoria: '8 GB con tarjeta gráfica dedicada o 12 GB con gráficos integrados.',
      tarjetaGrafica: 'Compatible con Vulkan 1.3 y al menos 2 GB de VRAM.',
      fuente: 'https://www.minecraft.net/es-es/store/minecraft-java-bedrock-edition-pc',
      notaFuente: 'Especificaciones Java actualizadas en julio de 2026; Bedrock tiene requisitos distintos.',
    },
  },
  {
    id: 3, titulo: 'Valorant', genero: 'Shooter', consola: 'PC', precio: 0, enOferta: true,
    imagen: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/aa65264cd8ebcdafb3fa5d28d434bcc108595050-1920x1080.jpg?accountingTag=VAL&w=1200&h=630&fm=webp&fit=crop&crop=center',
    descripcion: 'Un shooter táctico por equipos que combina precisión con armas y habilidades especiales. Ataca o defiende objetivos en rondas donde la comunicación, la estrategia y el trabajo en equipo son fundamentales.',
    requisitosMinimos: {
      sistemaOperativo: 'Windows 10 de 64 bits o Windows 11 de 64 bits.',
      procesador: 'Intel Core i3-540 o AMD Athlon 200GE.',
      memoria: '4 GB.',
      tarjetaGrafica: 'Intel HD 4000 o AMD Radeon R5 220.',
      otros: 'Compatibilidad con DirectX 11 y SSE 4.2 o AVX. En Windows 11 se requieren TPM 2.0 y arranque seguro UEFI.',
      fuente: 'https://playvalorant.com/es-es/specs/',
    },
  },
  {
    id: 4, titulo: 'EA Sports FC 24', genero: 'Deportes', consola: 'PS5', precio: 29990, precioOferta: 19990, enOferta: true,
    imagen: 'https://gonintendo.com/attachments/image/42112/file/medium-bcacd1a9410c9f9a59c51c7a372de225.jpg',
    descripcion: 'Simula partidos de fútbol con clubes, selecciones y competiciones disponibles en el juego. Construye tu equipo, compite en línea o disfruta de modos para un jugador con mecánicas de juego enfocadas en el realismo deportivo.',
  },
  {
    id: 5, titulo: 'The Legend of Zelda: Breath of the Wild', genero: 'Aventura', consola: 'Nintendo Switch', precio: 44990, enOferta: false,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRBK93HhQLCbI_vIc5dkXdcsAUPn7kCFdPA59sbk_ZVw&s=10',
    descripcion: 'Explora el reino de Hyrule como Link, recupera tus recuerdos y enfrenta la amenaza de Ganon. Escala montañas, resuelve santuarios, experimenta con las físicas del mundo y descubre secretos a tu propio ritmo.',
  },
  {
    id: 6, titulo: 'Fortnite', genero: 'Battle Royale', consola: 'PS5', precio: 0, enOferta: true,
    imagen: 'https://fortnite-api.com/images/cosmetics/br/CID_028_Athena_Commando_F/icon.png',
    descripcion: 'Aterriza en una isla, consigue armas y recursos y compite contra otros jugadores hasta ser el último superviviente. Su modalidad Battle Royale destaca por la construcción, las colaboraciones y los eventos dentro del juego.',
  },
  {
    id: 7, titulo: 'Call of Duty: Warzone', genero: 'Shooter', consola: 'PC', precio: 0, enOferta: false,
    imagen: 'https://i.blogs.es/11123b/bocw-s4-announcement-022/840_560.jpeg',
    descripcion: 'Un juego de combate en línea en el que debes sobrevivir frente a numerosos jugadores en mapas de gran tamaño. Busca armas y equipamiento, coordínate con tu escuadrón y lucha por ser el último equipo en pie.',
    requisitosMinimos: {
      sistemaOperativo: 'Windows 10 de 64 bits actualizado.',
      procesador: 'Intel Core i3-6100, Core i5-2500K o AMD Ryzen 3 1200.',
      memoria: '8 GB.',
      tarjetaGrafica: 'NVIDIA GeForce GTX 960 o AMD Radeon RX 470.',
      almacenamiento: '125 GB disponibles.',
      otros: 'DirectX 12 y conexión a internet.',
      fuente: 'https://www.callofduty.com/en/store/games/warzone',
      notaFuente: 'Verifica los requisitos de la versión instalada.',
    },
  },
  {
    id: 8, titulo: 'Overwatch 2', genero: 'Shooter', consola: 'PC', precio: 0, enOferta: true,
    imagen: 'https://media.vandal.net/m/10-2022/202210111759567_1.jpg',
    descripcion: 'Un juego de disparos por equipos en el que eliges héroes con habilidades únicas. Colabora con tus compañeros, cumple objetivos y combina estrategias para superar al equipo rival.',
    requisitosMinimos: {
      sistemaOperativo: 'Windows 10 de 64 bits.',
      procesador: 'Intel Core i3 o AMD Phenom X3 8650.',
      memoria: '6 GB.',
      tarjetaGrafica: 'NVIDIA GeForce GTX serie 600 o AMD Radeon HD serie 7000.',
      almacenamiento: '50 GB disponibles.',
      fuente: 'https://store.steampowered.com/app/2357570/Overwatch_2/',
      notaFuente: 'Los requisitos pueden cambiar.',
    },
  },
  {
    id: 9, titulo: 'Red Dead Redemption 2', genero: 'Mundo abierto', consola: 'PS4', precio: 39990, enOferta: false,
    imagen: 'https://fotografias-neox.atresmedia.com/clipping/cmsimages01/2018/10/31/647C01D3-C41C-47EF-B258-FB28D943AC45/69.jpg?crop=1920,1080,x0,y69&width=1280&height=720&optimize=low',
    descripcion: 'Acompaña a Arthur Morgan y a la banda de Van der Linde durante los últimos años del Viejo Oeste. Explora un enorme mundo abierto, completa misiones, caza, interactúa con otros personajes y toma decisiones que influyen en tu aventura.',
  },
  {
    id: 10, titulo: 'Resident Evil 4', genero: 'Terror', consola: 'PS5', precio: 34990, precioOferta: 24990, enOferta: true,
    imagen: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000012858/f4d4fd20c956621c4a342a8cade2e366f0e3cd43765bb52eccd0fea32b1606ce',
    descripcion: 'Leon S. Kennedy debe rescatar a la hija del presidente en una remota región de España. Enfréntate a enemigos infectados, administra tus recursos y descubre una conspiración en esta aventura de terror y supervivencia.',
  },
]

export const initialUsers = [
  { id: 1, nombre: 'Ingrid', username: 'ingrid', email: 'ingrid@gmail.com', password: '123456', role: 'ROLE_ADMIN' },
  { id: 2, nombre: 'Camila', username: 'camila', email: 'camila@gmail.com', password: '123456', role: 'ROLE_USER' },
  { id: 3, nombre: 'Javier', username: 'javier', email: 'javier@gmail.com', password: '123456', role: 'ROLE_USER' },
]

export const initialReviews = [
  { id: 1, calificacion: 5, comentario: 'Muy entretenido y con excelente jugabilidad.', usuario: { id: 1, nombre: 'Ingrid', email: 'ingrid@gmail.com' }, videojuego: { id: 1, titulo: 'GTA V' } },
  { id: 2, calificacion: 4, comentario: 'Ideal para jugar con amigos en línea.', usuario: { id: 2, nombre: 'Camila', email: 'camila@gmail.com' }, videojuego: { id: 2, titulo: 'Minecraft' } },
  { id: 3, calificacion: 5, comentario: 'Muy competitivo y rápido.', usuario: { id: 3, nombre: 'Javier', email: 'javier@gmail.com' }, videojuego: { id: 3, titulo: 'Valorant' } },
  { id: 4, calificacion: 3, comentario: 'Tiene buenas ideas, aunque puede mejorar.', usuario: { id: 2, nombre: 'Camila', email: 'camila@gmail.com' }, videojuego: { id: 4, titulo: 'EA Sports FC 24' } },
  { id: 5, calificacion: 5, comentario: 'Una aventura muy recomendable.', usuario: { id: 1, nombre: 'Ingrid', email: 'ingrid@gmail.com' }, videojuego: { id: 5, titulo: 'The Legend of Zelda: Breath of the Wild' } },
  { id: 6, calificacion: 4, comentario: 'Divertido para jugar en partidas cortas.', usuario: { id: 3, nombre: 'Javier', email: 'javier@gmail.com' }, videojuego: { id: 6, titulo: 'Fortnite' } },
]

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function read(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : clone(fallback)
  } catch {
    return clone(fallback)
  }
}

function write(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function seedMockData() {
  if (!window.localStorage.getItem(STORAGE_KEYS.games)) write(STORAGE_KEYS.games, initialGames)
  if (!window.localStorage.getItem(STORAGE_KEYS.reviews)) write(STORAGE_KEYS.reviews, initialReviews)
  if (!window.localStorage.getItem(STORAGE_KEYS.users)) write(STORAGE_KEYS.users, initialUsers)
}

export function resetMockData() {
  write(STORAGE_KEYS.games, initialGames)
  write(STORAGE_KEYS.reviews, initialReviews)
  write(STORAGE_KEYS.users, initialUsers)
}

export function getGames() { return read(STORAGE_KEYS.games, initialGames) }
export function getGameById(id) { return getGames().find((game) => Number(game.id) === Number(id)) }
export function createGame(data) {
  const games = getGames()
  const nextId = Math.max(0, ...games.map((game) => Number(game.id))) + 1
  const game = { ...data, id: nextId }
  write(STORAGE_KEYS.games, [...games, game])
  return game
}
export function updateGame(id, data) {
  const games = getGames()
  const updated = games.map((game) => Number(game.id) === Number(id) ? { ...game, ...data, id: game.id } : game)
  write(STORAGE_KEYS.games, updated)
  return updated.find((game) => Number(game.id) === Number(id))
}
export function deleteGame(id) {
  const games = getGames()
  write(STORAGE_KEYS.games, games.filter((game) => Number(game.id) !== Number(id)))
}

export function getReviews() { return read(STORAGE_KEYS.reviews, initialReviews) }
export function getUsers() { return read(STORAGE_KEYS.users, initialUsers) }
export function getUserByUsername(username) { return getUsers().find((user) => user.username === username) }
export function createUser(data) {
  const users = getUsers()
  const nextId = Math.max(0, ...users.map((user) => Number(user.id))) + 1
  const user = { ...data, id: nextId, role: 'ROLE_USER' }
  write(STORAGE_KEYS.users, [...users, user])
  return user
}
export function createReview(data) {
  const reviews = getReviews()
  const user = getUsers().find((item) => Number(item.id) === Number(data.usuarioId))
  const game = getGames().find((item) => Number(item.id) === Number(data.videojuegoId))
  if (!user || !game) throw new Error('Usuario o videojuego no encontrado')
  const nextId = Math.max(0, ...reviews.map((review) => Number(review.id))) + 1
  const review = {
    id: nextId,
    calificacion: Number(data.calificacion),
    comentario: data.comentario,
    usuario: { id: user.id, nombre: user.nombre, email: user.email },
    videojuego: { id: game.id, titulo: game.titulo },
  }
  write(STORAGE_KEYS.reviews, [...reviews, review])
  return review
}
export function updateReview(id, data) {
  const reviews = getReviews()
  const user = getUsers().find((item) => Number(item.id) === Number(data.usuarioId))
  const game = getGames().find((item) => Number(item.id) === Number(data.videojuegoId))
  const current = reviews.find((review) => Number(review.id) === Number(id))
  if (!current || !user || !game) throw new Error('Reseña, usuario o videojuego no encontrado')
  const updated = { ...current, calificacion: Number(data.calificacion), comentario: data.comentario, usuario: { id: user.id, nombre: user.nombre, email: user.email }, videojuego: { id: game.id, titulo: game.titulo } }
  write(STORAGE_KEYS.reviews, reviews.map((review) => Number(review.id) === Number(id) ? updated : review))
  return updated
}
export function deleteReview(id) {
  write(STORAGE_KEYS.reviews, getReviews().filter((review) => Number(review.id) !== Number(id)))
}

export function searchGames(games, query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return games
  return games.filter((game) => `${game.titulo} ${game.genero} ${game.consola}`.toLowerCase().includes(normalized))
}

export function getAverageRating(reviews, gameId) {
  const gameReviews = reviews.filter((review) => Number(review.videojuego?.id) === Number(gameId))
  if (!gameReviews.length) return 0
  return gameReviews.reduce((sum, review) => sum + Number(review.calificacion), 0) / gameReviews.length
}
