import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ShopContextProvider from "./Context/ShopContex.jsx";
import ServicesContexProvider from "./Context/ServicesContex.jsx";
import { CartProvider } from "./Context/ContextReducer.jsx";
import OrderContextProvider from "./Context/OrderContex.jsx";
import BookingContexProvider from "./Context/BookingContex.jsx";
import UserContexProvider from "./Context/UserContex.jsx";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
      <ServicesContexProvider>
        <CartProvider>
          <OrderContextProvider>
            <BookingContexProvider>
              <UserContexProvider>
                <Provider store={store}>
                  <App />
                </Provider>
              </UserContexProvider>
            </BookingContexProvider>
          </OrderContextProvider>
        </CartProvider>
      </ServicesContexProvider>
    </ShopContextProvider>
  </React.StrictMode>
);
