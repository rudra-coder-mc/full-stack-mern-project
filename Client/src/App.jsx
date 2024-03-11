import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navigation/Navbar";
import Service from "./Pages/Services";
import Product from "./Pages/Product";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import DashBoard from "./admin/Dashboard/";
import AboutUs from "./Pages/About";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import Page1 from "./admin/Components/Page1";
import ChangPassword from "./Components/Login/ChangPassword";
import ProductInsertPage from "./admin/Components/Product/ProductInsertPage";

import ProductCategory from "./Pages/ProductCategory";
import ServicesCategory from "./Pages/ServicesCategory";
import ProductEditePage from "./admin/Components/Product/ProductEditePage";

function App() {
  const currentPath = window.location.pathname; // Get current path

  return (
    <>
      <div className="bg-[#EEF5FF]">
        <BrowserRouter>
          {/* {currentPath !== "/Dashboard" && <Navbar />}{" "} */}
          <Navbar />
          {/* Render Navbar only if not dashboard */}
          <Routes>
            <Route path="/Dashboard" element={<DashBoard />} />
            <Route path="/Dashbord/page1" element={<Page1 />} />
            <Route path="/ProductInsertPage" element={<ProductInsertPage />} />
            <Route path="/ProductEditePage" element={<ProductEditePage />} />

            <Route path="/" element={<Home />} />
            <Route path="/ProductCategory" element={<ProductCategory />} />
            <Route path="/ServicesCategory" element={<ServicesCategory />} />

            <Route path="/service" element={<Service />}>
              <Route path=":ServiceId" element={<Service />} />
            </Route>

            <Route path="/product" element={<Product />}>
              <Route path=":ProductId" element={<Product />} />
            </Route>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Login/Update" element={<ChangPassword />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
          {currentPath !== "/Dashboard" && <Footer />}{" "}
          {/* Render Footer only if not dashboard */}
        </BrowserRouter>
      </div>
      <div className="bg-[#EEF5FF]"></div>
    </>
  );
}

export default App;
