

import Card from "../Card/Card";

const Products = (prop) => {
  const { products } = prop;
  return (
    <>
      {products.map((product) => (
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
