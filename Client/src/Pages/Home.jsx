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
      <h1 class="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mt-12 mb-8">Our Best Selling Accessories</h1>

        <ProductCategory filter={"best selling"} />
      </>
      <Offers data={Data[0]} />
      <>
      <h1 class="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mt-12 mb-8">FREQUENTLY BOOKED SERVICES</h1>
        <ServicesCategory filter={"relevant"} />
      </>
      <Offers data={Data[1]}/>
    </>
  );
};

export default Home;
