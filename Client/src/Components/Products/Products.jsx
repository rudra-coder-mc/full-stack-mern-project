import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContex";
// import uploads from "../../../public/uploads";

const Products = () => {
  const { data, loading, error } = useContext(ShopContext); // Access context properties

  if (loading) {
    return <p>Loading products...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching products: {error}</p>; // Handle errors gracefully
  }
  // const path = "../../../../uploads/";

  return (
    <>
      {data.map((product) => (
        <div key={product.id}>
          {/* Render product details here */}
          <h2>{product.name}</h2>

          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.ratings}</p>
          <img
            src={`/${product.image[0].url}`}
            alt={`/${product.image[0].url}`}
          />
          {/* ... other product information */}
        </div>
      ))}
    </>
  );
};

export default Products;
