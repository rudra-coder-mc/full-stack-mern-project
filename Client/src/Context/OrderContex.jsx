import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const OrderContext = createContext({
  data: [],
  loading: false,
  error: null,
  fetchData: () => {}, // Placeholder function initially
});

const OrderContextProvider = (prop) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axiosInstance.get(
        "http://localhost:4000/api/v1/admin/orders"
      );
      if (response.data.success) {
        setData(response.data.orders);
      } else {
        setError("Something went wrong. Please try again.");
        console.log(response);
      }
    } catch (error) {
      // Log error for debugging
      console.error("Error fetching data:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data initially

  return (
    <OrderContext.Provider value={{ data, loading, error, fetchData }}>
      {prop.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
