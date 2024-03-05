import { useState } from "react";
import axios from "axios";

function ProductInsertPage() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file or text input
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    setError(null); // Clear previous error messages

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/admin/product/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful submission (e.g., redirect, clear form)
      console.log("Product inserted successfully!", response.data);
      setFormData({
        name: "",
        image: null,
        description: "",
        price: 0,
        category: "",
        stock: 0,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Product insertion failed.");
      console.error(error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Insert</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
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
            className="rounded-md border border-gray-300 p-2 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
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
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.price}
            onChange={handleChange}
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
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.category}
            onChange={handleChange}
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
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.stock}
            onChange={handleChange}
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
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.image}
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
        >
          Insert Product
        </button>
      </form>
    </div>
  );
}

export default ProductInsertPage;
