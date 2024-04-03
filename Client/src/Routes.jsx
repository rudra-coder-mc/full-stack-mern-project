import { createBrowserRouter } from "react-router-dom";
import { Route, createRoutesFromElements } from "react-router-dom";
import Home from "./Pages/Home";

import Service from "./Pages/Services";
import Product from "./Pages/Product";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import Dashboard from "./admin/Dashboard";
import AboutUs from "./Pages/About";
import Cart from "./Pages/Cart";

import ProductCategory from "./Pages/ProductCategory";
import ServicesCategory from "./Pages/ServicesCategory";
import ProductInsertPage from "./admin/Components/Product/ProductInsertPage";
import ProductEditePage from "./admin/Components/Product/ProductEditePage";
import ProductUpdate from "./admin/Components/Product/ProductUpdate";
import ServicesInsertPage from "./admin/Components/Services/ServicesInsertPage";
import ServicesEditePage from "./admin/Components/Services/ServicesEditePage";
import ServicesUpdate from "./admin/Components/Services/ServicesUpdate";
import ProductReport from "./admin/Components/Report/ProductReport";
import ServiceReport from "./admin/Components/Report/ServiceReport";
import UserReport from "./admin/Components/Report/UserReport";
import TodyAppointments from "./admin/Components/Report/TodyAppointments";
import MyAccount from "./Pages/MyAccount";
import MyOrder from "./Components/MyOrder/MyOrder";
import MyBooking from "./Components/MyBooking/MyBooking";
import ChangPassword from "./Components/Login/ChangPassword";
import DHome from "./admin/Components/DHome/DHome";
import Address from "./Components/Address/Address";
import Booking from "./admin/Components/Booking";
import User from "./admin/Components/User/User";
// import router from "./Routes";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/service" element={<Service />}>
          <Route path=":ServiceId" element={<Service />} />
        </Route>
        <Route path="/ServicesCategory/service" element={<Service />}>
          <Route path=":ServiceId" element={<Service />} />
        </Route>
        <Route path="/ProductCategory/product" element={<Product />}>
          <Route path=":ProductId" element={<Product />} />
        </Route>
        <Route path="/product" element={<Product />}>
          <Route path=":ProductId" element={<Product />} />
        </Route>
        <Route path="/ProductCategory" element={<ProductCategory />} />
        <Route path="/ServicesCategory" element={<ServicesCategory />} />
        <Route path="/service" element={<Service />} />
        <Route path="/ServicesCategory/service" element={<Service />} />
        <Route path="/ProductCategory/product" element={<Product />} />
        <Route path="/product" element={<Product />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/MyAccount/UpdatePassword" element={<ChangPassword />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/MyAddress" element={<Address />} />
        <Route path="/MyOrder" element={<MyOrder />} />
        <Route path="/MyBooking" element={<MyBooking />} />
        <Route path="*" element={<p>There`s nothing here: 404!</p>} />
      </Route>
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="/Dashboard/Home" element={<DHome />} />
        <Route path="Booking" element={<Booking />} />
        <Route path="User" element={<User />} />
        <Route path="ProductInsert" element={<ProductInsertPage />} />
        <Route path="ProductEdite" element={<ProductEditePage />} />
        <Route path="ServicesInsert" element={<ServicesInsertPage />} />
        <Route path="ServicesEdite" element={<ServicesEditePage />} />
        <Route path="ProductRepor" element={<ProductReport />} />
        <Route path="ServiceReport" element={<ServiceReport />} />
        <Route path="UserReport" element={<UserReport />} />
        <Route path="TodyAppointments" element={<TodyAppointments />} />
        <Route path="ProductEdite/ProductUpdate/" element={<ProductUpdate />}>
          <Route path=":ProductUpdateId" element={<ProductUpdate />} />
        </Route>
        <Route
          path="ServicesEdite/ServicesUpdate/"
          element={<ServicesUpdate />}
        >
          <Route path=":ServicesUpdateId" element={<ServicesUpdate />} />
        </Route>

        <Route path="*" element={<p>There`s nothing here: 404!</p>} />
      </Route>
      <Route path="*" element={<p>There`s nothing here: 404!</p>} />
    </>
  )
);

export default router;
