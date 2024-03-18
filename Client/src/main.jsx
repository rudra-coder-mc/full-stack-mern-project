import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./Context/AuthProvider.jsx";
import ShopContextProvider from "./Context/ShopContex.jsx";
import ServicesContexProvider from "./Context/ServicesContex.jsx";
import { CartProvider } from "./Context/ContextReducer.jsx";
import OrderContextProvider from "./Context/OrderContex.jsx";
import BookingContexProvider from "./Context/BookingContex.jsx";
import UserContexProvider from "./Context/UserContex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
      <ServicesContexProvider>
        <CartProvider>
          <OrderContextProvider>
            <BookingContexProvider>
              <UserContexProvider>
                <AuthProvider>
                  <App location={window.location} />
                </AuthProvider>
              </UserContexProvider>
            </BookingContexProvider>
          </OrderContextProvider>
        </CartProvider>
      </ServicesContexProvider>
    </ShopContextProvider>
  </React.StrictMode>
);
