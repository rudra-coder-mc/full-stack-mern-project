import { createBrowserRouter } from "react-router-dom";
import { Route, createRoutesFromElements } from "react-router-dom";

import {
  About,
  Cart,
  Home,
  MyAccount,
  Product,
  ProductCategory,
  Services,
  ServicesCategory,
  Signup,
} from "../Pages/";

import {
  DHome,
  ProductEditePage,
  ProductInsertPage,
  ProductReport,
  ProductUpdate,
  ServiceReport,
  ServicesEditePage,
  ServicesInsertPage,
  ServicesUpdate,
  User,
  Booking,
  Dashboard,
  TodyAppointments,
  UserReport,
} from "../admin/";

import {
  Address,
  Login,
  ChangPassword,
  MyBooking,
  MyOrder,
  ProtectedRoute,
} from "../Components";

// import router from "./Routes";
import Layout from "./Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/service" element={<Services />}>
          <Route path=":ServiceId" element={<Services />} />
        </Route>
        <Route path="/ServicesCategory/service" element={<Services />}>
          <Route path=":ServiceId" element={<Services />} />
        </Route>
        <Route path="/ProductCategory/product" element={<Product />}>
          <Route path=":ProductId" element={<Product />} />
        </Route>
        <Route path="/product" element={<Product />}>
          <Route path=":ProductId" element={<Product />} />
        </Route>
        <Route path="/ProductCategory" element={<ProductCategory />} />
        <Route path="/ServicesCategory" element={<ServicesCategory />} />
        <Route path="/service" element={<Services />} />
        <Route path="/ServicesCategory/service" element={<Services />} />
        <Route path="/ProductCategory/product" element={<Product />} />
        <Route path="/product" element={<Product />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyAccount/UpdatePassword" element={<ChangPassword />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/aboutus" element={<About />} />
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
