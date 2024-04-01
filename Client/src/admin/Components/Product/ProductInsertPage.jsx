import { useState } from "react";
import axios from "axios";

function ProductInsertPage() {
  const [formData, setFormData] = useState({
    name: "",
    image: [],
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setMessage(null);
    // console.log(name);
    // console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file or text input
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous error messages
    setIsLoading(true);
    // console.log(formData);

    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/api/v1/admin/product/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ... (existing code)

      if (response.data && response.data.success) {
        // Success case: reset form data
        setFormData({
          name: "",
          image: [],
          description: "",
          price: 0,
          category: "",
          stock: 0,
        });
        setMessage("Product inserted successfully!");
      } else {
        // Handle validation or other errors
        setError(response.data?.message || "Product insertion failed.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Product insertion failed.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Insert</h1>
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
          <label htmlFor="name" className="text-sm font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="rounded-md border border-gray-300 p-2 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.description}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.price}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.category}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="text-sm font-medium mb-2">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.stock}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium mb-2">
            image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
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
          {isLoading ? "Inserting..." : "Insert Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductInsertPage;
