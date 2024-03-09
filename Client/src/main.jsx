import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./Context/AuthProvider.jsx";
import ShopContextProvider from "./Context/ShopContex.jsx";
import ServicesContexProvider from "./Context/ServicesContex.jsx";
import { CartProvider } from "./Context/ContextReducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
      <ServicesContexProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </ServicesContexProvider>
    </ShopContextProvider>
  </React.StrictMode>
);
