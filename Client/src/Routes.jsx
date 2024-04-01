import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import ErrorPage from "./ErrorPage.jsx";

import Service from "./Pages/Services";
import Product from "./Pages/Product";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import Dashboard from "./admin/Dashboard/";
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
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      // product
      {
        path: "/product",
        element: <Product />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":ProductId",
            element: <Product />,
          },
        ],
      },
      {
        path: "/ProductCategory",
        element: <ProductCategory />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/ProductCategory/product",
        element: <Product />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":ProductId",
            element: <Product />,
          },
        ],
      },
      //service
      {
        path: "/ServicesCategory",
        element: <ServicesCategory />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/service",
        element: <Service />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":ServiceId",
            element: <Service />,
          },
        ],
      },
      {
        path: "/ServicesCategory/service",
        element: <Service />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":ServiceId",
            element: <Service />,
          },
        ],
      },
      //MyAccount
      {
        path: "/MyAccount",
        element: <MyAccount />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/MyAccount/UpdatePassword",
        element: <ChangPassword />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/MyAddress",
        element: <Address />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/MyOrder",
        element: <MyOrder />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/MyBooking",
        element: <MyBooking />,
        errorElement: <ErrorPage />,
      },
      //Login and SignUp
      {
        path: "/Login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
      },
      //Cart
      {
        path: "/Cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
      //AboutUs
      {
        path: "/aboutus",
        element: <AboutUs />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      //home
      {
        path: "Home",
        element: <DHome />,
        errorElement: <ErrorPage />,
      },

      //booking
      {
        path: "Booking",
        element: <Booking />,
        errorElement: <ErrorPage />,
      },

      //user
      {
        path: "User",
        element: <User />,
        errorElement: <ErrorPage />,
      },

      //Report
      {
        path: "TodyAppointments",
        element: <TodyAppointments />,
        errorElement: <ErrorPage />,
      },
      {
        path: "UserReport",
        element: <UserReport />,
        errorElement: <ErrorPage />,
      },
      {
        path: "ServiceReport",
        element: <ServiceReport />,
        errorElement: <ErrorPage />,
      },
      {
        path: "ProductRepor",
        element: <ProductReport />,
        errorElement: <ErrorPage />,
      },

      // Admin product
      {
        path: "ProductInsert",
        element: <ProductInsertPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "ProductEdite",
        element: <ProductEditePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "ProductEdite/ProductUpdate/",
        element: <ProductUpdate />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":ProductUpdateId",
            element: <ProductUpdate />,
          },
        ],
      },

      // Admin Service
      {
        path: "ServicesInsert",
        element: <ServicesInsertPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "ServicesEdite",
        element: <ServicesEditePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "ServicesEdite/ServicesUpdate/",
        element: <ServicesUpdate />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":ServicesUpdateId",
            element: <ServicesUpdate />,
          },
        ],
      },
    ],
  },
]);

export default router;
