import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/";
import Navbar from "./Components/Navigation/Navbar";
import Service from "./pages/Service";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import ProductInsertPage from "./admin/ProductInsertPage";

import AboutUs from "./Pages/About";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="bg-[#EEF5FF]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />}>
            <Route path=":ServiceId" element={<Service />} />
          </Route>
          <Route path="/product" element={<Product />}>
            <Route path=":ProductId" element={<Product />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/ProductInsertPage" element={<ProductInsertPage />} />

          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
