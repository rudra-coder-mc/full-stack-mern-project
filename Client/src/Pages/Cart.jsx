import { useState, useEffect } from "react";
import { useCart } from "../Context/ContextReducer";
import axios from "axios";

export default function Cart() {
  const { state, dispatch } = useCart();
  const [Detail, setDetail] = useState(false);
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessage(null);

    // Update order state based on input name
    setOrder((prevData) => ({
      ...prevData,
      shippingInfo: {
        ...prevData.shippingInfo,
        [name]: value, // Update specific property based on input name
      },
    }));
  };
  const handleSubmit = async (event) => {
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
        <button
          className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          // onClick={handleCheckOut}
          onClick={() => setDetail((pre) => !pre)}
        >
          Set Detail
        </button>
      </div>

      {Detail && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">shipping Address</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {error && ( // Conditionally display error message
              <span className="text-red-500 font-bold text-sm block mb-4">
                {error}
              </span>
            )}
            {message && ( // Conditionally display error message
              <span className="text-green-500 font-bold text-sm block mb-4">
                {message}
              </span>
            )}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-medium mb-2">
                address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={order.shippingInfo.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-medium mb-2">
                city
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={order.shippingInfo.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="text-sm font-medium mb-2">
                state
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={order.shippingInfo.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pinCode" className="text-sm font-medium mb-2">
                pinCode
              </label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={order.shippingInfo.pinCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNo" className="text-sm font-medium mb-2">
                phoneNo
              </label>
              <input
                type="number"
                id="phoneNo"
                name="phoneNo"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={order.shippingInfo.phoneNo}
                onChange={handleChange}
                size="10"
                required
              />
            </div>

            {error && (
              <span className="text-red-500 font-bold text-sm block mb-4">
                {error}
              </span>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "processing..." : "check out"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
