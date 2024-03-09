import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContex";
import ProductDetailPage from "../Components/ProductDetailPage/ProductDetailPage";
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { ProductId } = useParams();
  const product = all_product.find((e) => e.id === Number(ProductId));
  return (
    <>
      <ProductDetailPage
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price}
        category={product.category}
        Stock={product.Stock}
      />
    </>
  );
};
export default Product;
