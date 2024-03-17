import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navigation/Navbar";
import Service from "./Pages/Services";
import Product from "./Pages/Product";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import Dashboard from "./admin/Dashboard/";
import AboutUs from "./Pages/About";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import ProductCategory from "./Pages/ProductCategory";
import ServicesCategory from "./Pages/ServicesCategory";
import Page1 from "./admin/Components/Page1";
import ProductInsertPage from "./admin/Components/Product/ProductInsertPage";
import ProductEditePage from "./admin/Components/Product/ProductEditePage";
import ServicesInsertPage from "./admin/Components/Services/ServicesInsertPage"

function App({ location }) {
  const isDashboardRoute = location.pathname.startsWith("/Dashboard");

  return (
    <>
      <div className="bg-[#EEF5FF]">
        <Router>
          {!isDashboardRoute && <Navbar />}
          <Routes>
            <Route path="/Dashboard/*" element={<Dashboard />}>
              <Route path="users" element={<Page1 />} />
              <Route path="productinsert" element={<ProductInsertPage />} />
              <Route path="allproducts" element={<ProductEditePage/>}/>
              <Route path="addservice" element={<ServicesInsertPage/>}/>
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/ProductCategory" element={<ProductCategory />} />
            <Route path="/ServicesCategory" element={<ServicesCategory />} />
            <Route path="/service" element={<Service />} />
            <Route path="/ServicesCategory/service" element={<Service />} />
            <Route path="/ProductCategory/product" element={<Product />} />
            <Route path="/product" element={<Product />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
          {!isDashboardRoute && <Footer />}
        </Router>
      </div>
      <div className="bg-[#EEF5FF]"></div>
    </>
  );
}

export default App;
