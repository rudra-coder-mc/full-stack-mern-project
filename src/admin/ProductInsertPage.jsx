// ProductInsertPage.js
import { useState } from "react";

const ProductInsertPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log(
      "Product Inserted:",
      productName,
      productDescription,
      productPrice,
      productImage
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Insert New Accessories</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-semibold">
            Accessories Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={handleProductNameChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productDescription"
            className="block text-sm font-semibold"
          >
            Accessories Description
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={handleProductDescriptionChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-sm font-semibold">
            Accessories Price
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={handleProductPriceChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productImage" className="block text-sm font-semibold">
            Accessories Image
          </label>
          <input
            type="file"
            id="productImage"
            onChange={handleProductImageChange}
            className="mt-1 p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Insert Accessories
        </button>
      </form>
    </div>
  );
};

export default ProductInsertPage;
