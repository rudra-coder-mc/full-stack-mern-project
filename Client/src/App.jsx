import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navigation/Navbar";
import Service from "./Pages/Service";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Admin from "./admin/DashBoard";

import AboutUs from "./Pages/About";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";

function App() {
  const currentPath = window.location.pathname; // Get current path

  return (
    <div className="bg-[#EEF5FF]">
      <BrowserRouter>

        {currentPath !== "/Dashboard" && <Navbar />} {/* Render Navbar only if not dashboard */}

       

        <Routes>
          <Route path="/Dashboard" element={<Admin />} />
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
          <Route path="/Cart" element={<Cart />} />
          </Routes>

        {currentPath !== "/Dashboard" && <Footer />} {/* Render Footer only if not dashboard */}

      

      </BrowserRouter>
    </div>
  );
}

export default App;