import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookingContex = createContext({
  BookingData: [],
  BookingLoading: false,
  BookingError: null,
  fetchBookingData: () => {}, // Placeholder function initially
});

const BookingContexProvider = (prop) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const [BookingData, setBookingData] = useState([]);
  const [BookingLoading, setBookingLoading] = useState(false);
  const [BookingError, setBookingError] = useState(null);

  const fetchBookingData = async () => {
    setBookingLoading(true);
    setBookingError(null); // Clear any previous errors

    try {
      const response = await axiosInstance.get(
        "/api/v1/booking"
      );
      if (response.data.success) {
        setBookingData(response.data || []); // Set default empty array for orders
      } else {
        setBookingError("Something went wrong. Please try again.");
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setBookingError("Something went wrong. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []); // Fetch data initially

  return (
    <BookingContex.Provider
      value={{ BookingData, BookingLoading, BookingError, fetchBookingData }}
    >
      {prop.children}
    </BookingContex.Provider>
  );
};

export default BookingContexProvider;
