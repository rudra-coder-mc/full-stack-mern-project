import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookingContex = createContext({
  data: [],
  loading: false,
  error: null,
  fetchData: () => {}, // Placeholder function initially
});

const BookingContexProvider = (prop) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axiosInstance.get(
        "http://localhost:4000/api/v1/booking"
      );
      if (response.data.success) {
        setData(response.data || []); // Set default empty array for orders
      } else {
        setError("Something went wrong. Please try again.");
        console.log(response);
      }
    } catch (error) {
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
    <BookingContex.Provider value={{ data, loading, error, fetchData }}>
      {prop.children}
    </BookingContex.Provider>
  );
};

export default BookingContexProvider;
