import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MyOrder = () => {
  const [user, setUser] = useState(null); // Use null for initial state
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Use consistent naming
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        return; // Handle user not logged in earlier
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      try {
        setIsLoading(true); // Set loading state before fetching

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include withCredentials for authorized requests
        };

        const response = await axios.get(
          "http://localhost:4000/api/v1/order/me",
          config
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error); // Handle errors more informatively
      } finally {
        setIsLoading(false); // Clear loading state after success or failure
      }
    };

    fetchOrder();
  }, []); // Empty dependency array ensures one-time execution

  if (!user) {
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

  const orderContent = isLoading ? (
    <p>Loading orders...</p>
  ) : (
    // Display order details here (assuming `order` has the necessary data)
    <div>{/* Display order information */}</div>
  );

  return (
    <>
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

      {orderContent}
    </>
  );
};

export default MyOrder;
