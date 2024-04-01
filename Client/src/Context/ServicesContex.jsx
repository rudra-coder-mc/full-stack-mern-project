
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ServicesContex = createContext({
  data: [],
  loading: false,
  error: null,
  fetchData: () => {}, // Placeholder function initially
});

const ServicesContexProvider = (prop) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axiosInstance.get(
        "/api/v1/service"
      );
      setData(response.data.services);
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
    <ServicesContex.Provider value={{ data, loading, error, fetchData }}>
      {prop.children}
    </ServicesContex.Provider>
  );
};

export default ServicesContexProvider;
