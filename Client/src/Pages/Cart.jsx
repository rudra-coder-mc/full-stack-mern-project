import { useCart } from "../Context/ContextReducer";

export default function Cart() {
  const { state, dispatch } = useCart();

  if (state.length === 0) {
    return (
      <div className="text-center text-black p-4">
        <h1 className="text-3xl font-bold">The Cart is Empty!</h1>
      </div>
    );
  }
  // Function to update quantity
  const handleQuantityChange = (id, newQuantity) => {
    // Validate new quantity (optional, adjust as needed)
    if (newQuantity <= 0) {
      return; // Handle invalid quantity (e.g., display error message)
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      id,
      quantity: newQuantity,
    });
  };

  // console.log(state);
  const totalPrice = state.reduce(
    (total, product) =>
      total + Number(product.price) * Number(product.quantity),
    0
  );
  // console.log(totalPrice);
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
              Total Price
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
                    handleQuantityChange(product.id, parseInt(e.target.value))
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
        <h1 className="text-xl font-bold text-gray-800">
          Total Price: {totalPrice}/-
        </h1>
        <button
          className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          // onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
