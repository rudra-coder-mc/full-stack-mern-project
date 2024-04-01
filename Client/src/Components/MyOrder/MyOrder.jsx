import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SubNav from "../SubNav/SubNav";

const MyOrder = () => {
  const [user, setUser] = useState(null); // Use null for initial state
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Use consistent naming
  const [orders, setOrders] = useState([]); // Use a plural state name for orders

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
          "http://localhost:4000/api/v1/orders/me", // Double-check endpoint URL
          config
        );

        setOrders(response.data.orders); // Set orders from response data
      } catch (error) {
        console.error("Error fetching orders:", error); // Log error message
        // Handle error more informatively (e.g., display error message to user)
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
    // Display order details here
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left border border-gray-200">
            Order ID
          </th>
          <th className="px-4 py-2 text-left border border-gray-200">
            Shipping Address
          </th>
          <th className="px-4 py-2 text-left border border-gray-200">Items</th>
          <th className="px-4 py-2 text-left border border-gray-200">
            Total Price
          </th>
          <th className="px-4 py-2 text-left border border-gray-200">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border border-gray-200">{order._id}</td>
            <td className="px-4 py-2 border border-gray-200">
              {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
              {order.shippingInfo.state}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              {order.orderItems.map((item) => (
                <span key={item._id}>
                  {item.name} (x{item.quantity})
                </span>
              ))}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              ₹{order.paymentInfo.totalPrice}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              {order.paymentInfo.orderStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <SubNav />

      {orderContent}
    </>
  );
};

export default MyOrder;
