import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Page";
import Product from "./pages/product/Page";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* If already logged in, redirect "/" to /Product */}
        <Route
          path="/"
          element={user ? <Navigate to="/Product" /> : <Auth />}
        />
        <Route
          path="/Product"
          element={user ? <Product /> : <Navigate to="/" />}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
