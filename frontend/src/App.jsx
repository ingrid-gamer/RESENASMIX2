import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Games from './pages/Games.jsx'
import GameDetail from './pages/GameDetail.jsx'
import Categories from './pages/Categories.jsx'
import Offers from './pages/Offers.jsx'
import Reviews from './pages/Reviews.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import PurchaseSuccess from './pages/PurchaseSuccess.jsx'
import PurchaseFailure from './pages/PurchaseFailure.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminGames from './pages/AdminGames.jsx'
import AdminReviews from './pages/AdminReviews.jsx'
import NotFound from './pages/NotFound.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="videojuegos" element={<Games />} />
            <Route path="videojuegos/:id" element={<GameDetail />} />
            <Route path="categorias" element={<Categories />} />
            <Route path="ofertas" element={<Offers />} />
            <Route path="resenas" element={<Reviews />} />
            <Route path="carrito" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="compra-exitosa" element={<PurchaseSuccess />} />
            <Route path="compra-fallida" element={<PurchaseFailure />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/videojuegos" element={<AdminGames />} />
            <Route path="admin/resenas" element={<AdminReviews />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
