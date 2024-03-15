import { useContext, useState } from "react";
import { ShopContext } from "../../../Context/ShopContex";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductEditePage = () => {
  const { data, loading, error, fetchData } = useContext(ShopContext); // Access context producterties
  const axiosInstance = axios.create({ withCredentials: true });

  const [isLoading, setIsLoading] = useState(false);

  const handelDelete = async (id) => {
    setIsLoading(true);
    let url = `http://localhost:4000/api/v1/admin/product/${id}`;
    try {
      await axiosInstance.delete(url);
      fetchData();
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <p>Loading products...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching products: {error}</p>; // Handle errors gracefully
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 items-center justify-center">
      {data.map((product) => (
        <div key={product._id}>
          <div className="w-full max-w-72 bg-white border border-gray-200 rounded-lg shadow">
            <img
              className="p-2 rounded-3xl h-40"
              src={product.image[0].url}
              alt="Product"
            />

            <div className="p-1">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                {product.name}
              </h5>

              <div className="flex items-center mb-2">
                {[...Array(product.ratings)].map((_, index) => (
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
                  {product.ratings}
                </span>
              </div>

              <p className="mb-3 text-gray-700">
                description: {product.description}
              </p>

              <div className="flex justify-between mb-2">
                <div className="text-sm font-semibold text-gray-900">
                  {/* New Price: ${product.price.new} */}
                  category : {product.category}
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {/* New Price: ${product.price.new} */}
                  stock: {product.stock}
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {/* New Price: ${product.price.new} */}
                  Price: ₹ {product.price}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  className="inline-block bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => {
                    handelDelete(product._id);
                  }}
                >
                  {isLoading ? "isloadin" : "Delete"}
                </button>

                <Link to={`ProductUpdate/${product._id}`}>
                  <button className="inline-block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-white font-medium rounded-lg text-sm px-5 py-2.5">
                    Edite
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductEditePage;
