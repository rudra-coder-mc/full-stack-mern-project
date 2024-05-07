import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Feachers/Auth/AuthSlice";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const handleError = (error) => {
  if (error.response) {
    return error.response.data.message || "An error occurred.";
  } else if (error.request) {
    return "No response received from the server. Please check your internet connection.";
  } else {
    return "An error occurred while processing your request.";
  }
};

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.Auth.status);

  const handleLogout = async () => {
    try {
      await axios.get(`/api/v1/logout`);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout error :: ", error);
      throw handleError(error);
    }
  };

  return (
    <>
      {status ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleLogout}
        >
          Log Out
        </button>
      ) : (
        <>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <NavLink to="/login">Log In</NavLink>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <NavLink to="/signup">Sign Up</NavLink>
          </button>
        </>
      )}
    </>
  );
};

export default AuthButton;
