import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/";
import Navbar from "./Components/Navigation/Navbar";
import Service from "./pages/Service";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AboutUs from "./Components/Footer/aboutus";

function App() {
  return (
    <div className="bg-[#EEF5FF]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/product" element={<Product />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
