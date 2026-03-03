import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Homepage from "./pages/Homepage"
import Catalog from "./pages/Catalog"
import Balls from "./pages/Balls"
import Shoes from "./pages/Shoes"
import Apparel from "./pages/Apparel"
import About from "./pages/About"
import Delivery from "./pages/Delivery"
import Payment from "./pages/Payment"
import Contacts from "./pages/Contacts"
import Accessories from "./pages/Accessories"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Protection from "./pages/Protection"
import Training from "./pages/Training"
import Hoops from "./pages/Hoops"
import Bags from "./pages/Bags"
import Brands from "./pages/Brands"
import Register from "./pages/Register"
import { AuthProvider } from "./pages/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Homepage />} />
        <Route path="/catalog"     element={<Catalog />} />
        <Route path="/balls"       element={<Balls />} />
        <Route path="/shoes"       element={<Shoes />} />
        <Route path="/apparel"     element={<Apparel />} />
        <Route path="/about"       element={<About />} />
        <Route path="/delivery"    element={<Delivery />} />
        <Route path="/payment"     element={<Payment />} />
        <Route path="/contacts"    element={<Contacts />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart"        element={<Cart />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/protection"  element={<Protection />} />
        <Route path="/training"    element={<Training />} />
        <Route path="/hoops"       element={<Hoops />} />
        <Route path="/bags"        element={<Bags />} />
        <Route path="/brands"      element={<Brands />} />
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App