import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = (prop) => {
  const { children } = prop;
  const API_URL = "http://localhost:4000/api/v1/";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const handleError = (error) => {
    if (error.response) {
      return error.response.data.message || "An error occurred.";
    } else if (error.request) {
      return "No response received from the server. Please check your internet connection.";
    } else {
      return "An error occurred while processing your request.";
    }
  };

  const login = async (email, password) => {
    setIsLoading(true); // Set loading state
    const data = { email, password };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axiosInstance.post(
        `${API_URL}/login`,
        data,
        config
      );

      setToken(response.data.token);
      setUser(response.data.user); // Assuming more user data is retrieved
      setIsLoading(false); // Clear loading state

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      let strUser = JSON.stringify(response.data.user);
      localStorage.setItem("user", strUser);
      return true;
    } catch (error) {
      setIsLoading(false); // Clear loading state
      return handleError(error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get(`${API_URL}/logout`);

      localStorage.removeItem("token"); // Choose localStorage or cookies here
      localStorage.removeItem("role"); // Choose localStorage or cookies here
      localStorage.removeItem("user"); // Choose localStorage or cookies here
      setUser(null);
      setToken(null);
      return true;
    } catch (error) {
      return handleError(error);
    }
  };

  const SignUp = async (name, email, password) => {
    const data = { name, email, password };
    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/api/v1/register",
        data
      );

      if (response.data.success) {
        // Handle successful signup
        console.log("Signup successful!");
        // localStorage.setItem("token", response.data.token);
        return true;
        // Redirect to login page
      } else {
        return response.data.message; // Set error message from response
      }
    } catch (error) {
      return handleError(error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Optionally fetch user data based on token (if needed)
    }
    const storedRole = localStorage.getItem("role");
    // console.log(storedRole);
    if (storedRole) {
      setUser(storedRole);
      // Optionally fetch user data based on token (if needed)
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, SignUp, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
