import { useState } from "react";
import hero_img1 from "../../assets/hero_img1.jpeg";
// import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const product = {
    name: "Example Product",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui justo. Donec suscipit arcu ut metus malesuada, ac posuere nulla vestibulum.",
    oldPrice: 50,
    newPrice: 40,
    type: "Example Type",
    image: "example.jpg", // Replace with your actual image URL
  };
  // const { ProductId } = useParams();
  // const product = all_product.find((e) => e.id === Number(ProductId));

  const [fittingOption, setFittingOption] = useState("");

  const handleFittingOptionChange = (event) => {
    setFittingOption(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={hero_img1}
            alt={product.name}
            className="w-full h-auto mb-4 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-gray-500 line-through mr-2">
              ${product.oldPrice}
            </span>
            <span className="text-red-500">${product.newPrice}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{product.type}</p>
          <div className="mb-4">
            <label
              htmlFor="fittingOption"
              className="block text-sm font-medium text-gray-700"
            >
              Select Fitting Option:
            </label>
            <select
              id="fittingOption"
              name="fittingOption"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={fittingOption}
              onChange={handleFittingOptionChange}
            >
              <option value="">Select...</option>
              {[1, 2, 3, 4, 5].map((option) => (
                <option key={option} value={`Option ${option}`}>
                  Option {option}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
