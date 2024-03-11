import Product from "../Components/Products/Products";

const ProductCategory = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 items-center justify-center">
        <Product />
      </div>
    </>
  );
};
export default ProductCategory;
