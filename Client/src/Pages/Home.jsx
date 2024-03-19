import Hero from "../Components/Hero/Hero";

import Offers from "../Components/Offers/Offers";
import ProductCategory from "./ProductCategory";
import ServicesCategory from "./ServicesCategory";


const Home = () => {
  return (
    <>
      <Hero />
      <>
        <ProductCategory />
      </>
      <Offers />
      <>
        <ServicesCategory />
      </>
      <Offers />
    </>
  );
};

export default Home;
