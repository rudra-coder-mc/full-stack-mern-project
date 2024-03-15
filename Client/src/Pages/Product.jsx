import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContex";

import ProductDetailPage from "../Components/ProductDetailPage/ProductDetailPage";

const Product = () => {
  const { data, loading, error } = useContext(ShopContext); // Access context properties
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the filtered product
  const { ProductId } = useParams();

  // Fetch and filter data when component mounts
  useEffect(() => {
    if (data && !loading && !error) {
      // Filter the product based on ProductId
      const filteredProduct = data.find((product) => product._id === ProductId);

      setSelectedProduct(filteredProduct);
      // console.log(data);
    }
  }, [data, loading, error, ProductId]);

  if (loading) {
    return <p>Loading products...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching products: {error}</p>; // Handle errors gracefully
  }

  if (!selectedProduct) {
    return <p>Product not found.</p>; // Handle cases where product is not found
  }
  // console.log(selectedProduct);

  return (
    <ProductDetailPage
      id={selectedProduct._id}
      image={selectedProduct.image[0].url}
      name={selectedProduct.name}
      description={selectedProduct.description}
      price={selectedProduct.price}
      category={selectedProduct.category}
      stock={selectedProduct.stock}
      ratings={selectedProduct.ratings}
    />
  );
};

export default Product;
