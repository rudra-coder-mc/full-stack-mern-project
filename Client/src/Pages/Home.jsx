import Hero from "../Components/Hero/Hero";

import Offers from "../Components/Offers/Offers";
import ProductCategory from "./ProductCategory";
import ServicesCategory from "./ServicesCategory";
import Data from "../assets/Data/Data"

const Home = () => {
  console.log(Data[1]);
  return (
    <>
      <Hero />
      <>
        <ProductCategory filter={"best selling"} />
      </>
      <Offers data={Data[0]} />
      <>
        <ServicesCategory filter={"relevant"} />
      </>
      <Offers data={Data[1]}/>
    </>
  );
};

export default Home;
