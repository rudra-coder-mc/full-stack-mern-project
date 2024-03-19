import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
      const [User, setUser] = useState();
      const navigate = useNavigate();

      useEffect(() => {
        let data = localStorage.getItem("user");
        let user = JSON.parse(data);
        setUser(user);
      }, []);

      if (!User) {
        return (
          <>
            <p>User is not logged in.</p>
            <button
              className="bg-blue-500 text-white rounded-lg m-2 p-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        );
      }
  return (
    <>
      {" "}
      <nav className="flex items-center justify-center mt-4">
        <NavLink
          to="/MyAccount"
          className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium"
        >
          Profile
        </NavLink>
        <NavLink
          to="/MyOrder"
          className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium ml-2"
        >
          My Orders
        </NavLink>
        <NavLink
          to="/MyBooking"
          className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium ml-2"
        >
          My Bookings
        </NavLink>
      </nav>
    </>
  );
};
export default MyBooking;
