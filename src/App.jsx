import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  // const user = useSelector((state) => state.user.currentUser);
  const user = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/e-commerce-app" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/e-commerce-app" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/e-commerce-app" /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
