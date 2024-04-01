import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const OrderContext = createContext({
  OrderData: [],
  OrderLoading: false,
  OrderError: null,
  fetchOrderData: () => {}, // Placeholder function initially
});

const OrderContextProvider = (prop) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const [OrderData, setOrderData] = useState([]);
  const [OrderLoading, setOrderLoading] = useState(false);
  const [OrderError, setOrderError] = useState(null);

  const fetchOrderData = async () => {
    setOrderLoading(true);
    setOrderError(null); // Clear any previous errors

    try {
      const response = await axiosInstance.get(
        "/api/v1/admin/orders"
      );
      if (response.data.success) {
        setOrderData(response.data.orders);
      } else {
        setOrderError("Something went wrong. Please try again.");
        console.log(response);
      }
    } catch (error) {
      // Log error for debugging
      console.error("Error fetching data:", error);
      setOrderError("Something went wrong. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []); // Fetch data initially

  return (
    <OrderContext.Provider
      value={{ OrderData, OrderLoading, OrderError, fetchOrderData }}
    >
      {prop.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
