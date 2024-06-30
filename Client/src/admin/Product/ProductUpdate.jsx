import { useParams } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContex";
import { useContext, useEffect, useState } from "react";
import Updatep from "./Updatep";

const ProductUpdate = () => {
  const { data, loading, error } = useContext(ShopContext); // Access context properties
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the filtered product
  const { ProductUpdateId } = useParams();

  // Fetch and filter data when component mounts
  useEffect(() => {
    if (data && !loading && !error) {
      // Filter the product based on ProductUpdateId
      const filteredProduct = data.find(
        (product) => product._id === ProductUpdateId
      );

      setSelectedProduct(filteredProduct);
      //   console.log(data);
    }
  }, [data, loading, error, ProductUpdateId]);

  if (loading) {
    return <p>Loading products...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching products: {error}</p>; // Handle errors gracefully
  }
  //   console.log(selectedProduct);

  return (
    selectedProduct && (
      <Updatep
        id={selectedProduct._id}
        image={selectedProduct.image[0].url}
        name={selectedProduct.name}
        description={selectedProduct.description}
        price={selectedProduct.price}
        category={selectedProduct.category}
        stock={selectedProduct.stock}
        ratings={selectedProduct.ratings}
        updateId={ProductUpdateId}
      />
    )
  );
};
export default ProductUpdate;
