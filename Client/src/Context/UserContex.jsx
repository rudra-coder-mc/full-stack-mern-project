import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContex = createContext({
  UserData: [],
  UserLoading: false,
  UserError: null,
  fetchUserData: () => {}, // Placeholder function initially
});

const UserContexProvider = (prop) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const [UserData, setUserData] = useState([]);
  const [UserLoading, setUserLoading] = useState(false);
  const [UserError, setUserError] = useState(null);

  const fetchUserData = async () => {
    setUserLoading(true);
    setUserError(null); // Clear any previous errors

    try {
      const response = await axiosInstance.get(
        "http://localhost:4000/api/v1/admin/users"
      );
      if (response.data.success) {
        setUserData(response.data);
      } else {
        setUserError("Something went wrong. Please try again.");
        console.log(response);
      }
    } catch (error) {
      // Log error for debugging
      console.error("Error fetching data:", error);
      setUserError("Something went wrong. Please try again.");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch data initially

  return (
    <UserContex.Provider
      value={{ UserData, UserLoading, UserError, fetchUserData }}
    >
      {prop.children}
    </UserContex.Provider>
  );
};

export default UserContexProvider;
