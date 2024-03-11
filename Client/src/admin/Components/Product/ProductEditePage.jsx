import { useContext } from "react";
import { ShopContext } from "../../../Context/ShopContex";
import ProductCard from "./ProductCard";

const ProductEditePage = () => {
  const { data, loading, error } = useContext(ShopContext); // Access context properties

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
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            ratings={product.ratings}
            image={product.image[0].url}
            stock={product.stock}
            category={product.category}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductEditePage;
