import { useState } from "react";
import { useCart } from "../../Context/ContextReducer";
import { useNavigate } from "react-router-dom";
const ProductDetailPage = (prop) => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityIncrement = () => {
    if (quantity < prop.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const existingItemIndex = state.findIndex((item) => item.id === prop.id);

    if (existingItemIndex !== -1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        id: prop.id,
        quantity: quantity,
      });
      return;
    }

    dispatch({
      type: "ADD",
      ...prop,
      quantity: quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <img
            src={prop.image}
            alt={prop.name}
            className="w-[80%] h-[70dvh] mb-4 rounded-lg object-cover"
          />
          {prop.stock > 0 && (
            <span className="text-green-500 font-bold">In Stock</span>
          )}
          {prop.stock === 0 && (
            <span className="text-red-500 font-bold">Out of Stock</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{prop.name}</h1>
          <div className="flex items-center mb-2">
            {[...Array(prop.ratings)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-3">
              {prop.ratings}
            </span>
          </div>
          <p className="text-black text-sm mb-4">{prop.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-green-500">Price : ₹ {prop.price}</span>
          </div>
          <p className="text-sm text-black mb-4">category : {prop.category}</p>
          <div className="block mb-4">
            <label htmlFor="quantity" className="text-sm font-medium mr-2">
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-2 rounded-lg mr-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onClick={handleQuantityDecrement}
                disabled={quantity === 1} // Disable decrement button if quantity is 1
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                className="quantity-input w-20 text-center border border-gray-300 rounded-lg px-2 py-1"
                value={quantity}
                disabled
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button
                className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-2 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onClick={handleQuantityIncrement}
                disabled={quantity === prop.stock} // Disable increment button if quantity is stock limit
              >
                +
              </button>
            </div>
          </div>

          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ${
              prop.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={prop.stock === 0}
            onClick={addToCart}
          >
            {prop.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
