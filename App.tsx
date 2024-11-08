import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./contex/AuthContex"

import Category from "./pages/Category"
import Home from "./pages/Home"
import CreateOrder from "./pages/orders/CreateOrder"
import Order from "./pages/orders/Order"
import Product from "./pages/Product"


import Invoice from "./pages/Invoice"
import Profile from "./pages/Profile"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"





function App() { //functional component

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Protected routes - need login to access */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/create" element={<CreateOrder />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            
          </Route>

          {/* Open route */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/users" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )

}


export default App