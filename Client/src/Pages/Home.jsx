import Hero from "../Components/Hero/Hero";

import Offers from "../Components/Offers/Offers";
import ProductCategory from "./ProductCategory";
import ServicesCategory from "./ServicesCategory";

const Home = () => {
  return (
    <>
      <Hero />
      <>
        <ProductCategory filter={"best selling"} />
      </>
      <Offers />
      <>
        <ServicesCategory filter={"relevant"} />
      </>
      <Offers />
    </>
  );
};

export default Home;
