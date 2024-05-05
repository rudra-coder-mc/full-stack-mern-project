// const ServicesUpdate = () => {
//   return <div>ServicesUpdate</div>;
// };
// export default ServicesUpdate;
import { useParams } from "react-router-dom";
import { ServicesContex } from "../../Context/ServicesContex";
import { useContext, useEffect, useState } from "react";
// import Updatep from "./Updatep";
import Updates from "./Updates";

const ServicesUpdate = () => {
  const { data, loading, error } = useContext(ServicesContex); // Access context properties
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the filtered product
  const { ServicesUpdateId } = useParams();

  // Fetch and filter data when component mounts
  useEffect(() => {
    if (data && !loading && !error) {
      // Filter the product based on ServicesUpdateId
      const filteredProduct = data.find(
        (product) => product._id === ServicesUpdateId
      );

      setSelectedProduct(filteredProduct);
      //   console.log(data);
    }
  }, [data, loading, error, ServicesUpdateId]);

  if (loading) {
    return <p>Loading products...</p>; // Render loading indicator
  }

  if (error) {
    return <p>Error fetching products: {error}</p>; // Handle errors gracefully
  }
  console.log(selectedProduct);

  return (
    selectedProduct && (
      <Updates
        id={selectedProduct._id}
        image={selectedProduct.image[0].url}
        name={selectedProduct.name}
        description={selectedProduct.description}
        price={selectedProduct.price}
        category={selectedProduct.category}
        stock={selectedProduct.stock}
        ratings={selectedProduct.ratings}
        updateId={ServicesUpdateId}
      />
    )
  );
};
export default ServicesUpdate;
