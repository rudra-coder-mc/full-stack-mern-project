import { useState, useEffect } from "react";
import { useCart } from "../Context/ContextReducer";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const { state, dispatch } = useCart();

  const [order, setOrder] = useState({
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      pinCode: 0,
      phoneNo: 0,
    },
    orderItems: [],
    paymentInfo: {
      itemsPrices: 0,
      taxPrices: 0,
      shippingPrice: 0,
      totalPrice: 0,
    },
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const calculatePaymentInfo = (cartItems) => {
    const itemsPrices = cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const taxPrices = (itemsPrices * 12) / 100; // Assuming 12% tax
    const shippingPrices = cartItems.reduce(
      (total, product) => total + 40 * Number(product.quantity),
      0
    );
    const totalPrice = itemsPrices + taxPrices + shippingPrices;

    return {
      itemsPrices,
      taxPrices,
      shippingPrices,
      totalPrice,
    };
  };

  useEffect(() => {
    // Trigger calculation using the existing function
    setOrder((prevData) => ({
      ...prevData,
      paymentInfo: calculatePaymentInfo(prevData.orderItems),
    }));
    let data = JSON.parse(localStorage.getItem("address"));
    setOrder((prevData) => ({
      ...prevData,
      shippingInfo: data,
    }));
  }, [state]);
  useEffect(() => {
    const updatedOrderItems = state.map((product) => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      product: product.id,

      // ... other relevant product details
    }));
    setOrder((prevData) => ({
      ...prevData,
      orderItems: updatedOrderItems,
    }));
  }, [state]);

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  // console.log(order.shippingInfo);
  const handleCheckOut = async (event) => {
    event.preventDefault();

    setError(null); // Clear previous error messages
    setIsLoading(true);
    if (
      !order.shippingInfo.address ||
      !order.shippingInfo.city ||
      !order.shippingInfo.state ||
      !order.shippingInfo.pinCode ||
      !order.shippingInfo.phoneNo
    ) {
      setError("Please fill in all required shipping information fields.");
      return;
    }
    console.log(order.paymentInfo);

    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/api/v1/order/new",
        JSON.stringify(order),
        {
          headers: {
            "Content-Type": "application/json", // Adjust based on data format
          },
        }
      );

      // ... (existing code)
      console.log(response.data);
      if (response.data && response.data.success) {
        // Success case: reset form data
        dispatch({ type: "DROP" });
        setMessage("order processing successfully!");
      } else {
        // Handle validation or other errors
        setError(response.data?.message || "order processing failed.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "order processing failed.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (state.length === 0) {
    return (
      <div className="text-center text-black p-4">
        <h1 className="text-3xl font-bold">The Cart is Empty!</h1>
      </div>
    );
  }

  // Function to update quantity
  const handleQuantityChange = (id, newQuantity) => {
    // ... existing validation logic

    dispatch({ type: "UPDATE_QUANTITY", id, quantity: newQuantity });

    // Recalculate payment information based on updated cart state
    const updatedOrderItems = state.map((product) => ({
      ...product,
      quantity: product.id === id ? newQuantity : product.quantity, // Update quantity only for the changed product
    }));
    setOrder((prevData) => ({
      ...prevData,
      orderItems: updatedOrderItems,
      paymentInfo: calculatePaymentInfo(updatedOrderItems), // Call the calculation function
    }));
  };
  console.log(error);
  console.log(message);
  return (
    <div className="container mx-auto mt-5">
      <table className="table-auto w-full shadow-md rounded-lg">
        {/* Table header */}
        <thead className="bg-gray-100 text-gray-600 font-bold">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Product Price
            </th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {state.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-left">{index + 1}</td>
              <td className="px-6 py-4 text-left">{product.name}</td>
              <td className="px-6 py-4 text-left">
                {product.description.slice(0, 50)}
              </td>
              <td className="px-6 py-4 text-left">{product.price}</td>
              <td className="px-6 py-4 text-left">{product.category}</td>
              <td className="px-6 py-4 text-left">
                <input
                  type="number"
                  min="1" // Set minimum quantity to 1 (optional)
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                  className="w-20 text-center border border-gray-300 rounded-lg px-2 py-1"
                />
              </td>
              <td className="px-6 py-4 text-left">
                {(Number(product.price) * Number(product.quantity)).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-left">
                <button
                  type="button"
                  className="btn-sm bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => dispatch({ type: "REMOVE", id: product.id })}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Total price and checkout button */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-base font-bold text-gray-800">
            Product Price: {order.paymentInfo.itemsPrices}/-
          </p>
          <p className="text-base font-bold text-gray-800">
            Tax: {order.paymentInfo.taxPrices}/-
          </p>
          <p className="text-base font-bold text-gray-800">
            Shipping Cost: {order.paymentInfo.shippingPrices}/-
          </p>
          ------------------------------
          <p className="text-xl font-bold text-gray-800">
            Total Price: {order.paymentInfo.totalPrice}/-
          </p>
        </div>
        {/* ... */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          <NavLink to="/MyAccount">Edit Address</NavLink>
        </button>

        <button
          type="submit"
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          disabled={isLoading}
          onClick={handleCheckOut}
        >
          {isLoading ? "processing..." : "check out"}
        </button>
      </div>
    </div>
  );
}
