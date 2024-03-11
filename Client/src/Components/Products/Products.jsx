import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContex";
import Card from "../Card/Card";
// import uploads from "../../../public/uploads";

const Products = () => {
  const { data, loading, error } = useContext(ShopContext); // Access context properties

  if (loading) {
    return <p>Loading products...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching products: {error}</p>; // Handle errors gracefully
  }
  // console.log(data);
  return (
    <>
      {data.map((product) => (
        <Card
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
      ))}
    </>
  );
};

export default Products;
