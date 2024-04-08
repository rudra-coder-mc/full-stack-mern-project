import Hero from "../Components/Hero/Hero";

import Offers from "../Components/Offers/Offers";
import ProductCategory from "./ProductCategory";
import ServicesCategory from "./ServicesCategory";
import Data from "../assets/Data/Data";

const Home = () => {
  // console.log(Data[1]);

  return (
    <>
      <Hero />
      <>
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mt-12 mb-8">
          Our Best Selling Accessories
        </h1>
        <div className="flex items-center justify-center">
          <ProductCategory filter={"best selling"} />
        </div>
      </>
      <Offers data={Data[0]} />
      <>
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mt-12 mb-8">
          FREQUENTLY BOOKED SERVICES  
        </h1>
        <div className="flex items-center justify-center">
          <ServicesCategory filter={"relevant"} />
        </div>
      </>
      <Offers data={Data[1]} />
    </>
  );
};

export default Home;
