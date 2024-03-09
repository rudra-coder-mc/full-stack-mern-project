import Hero from "../Components/Hero/Hero";
import Card from "../Components/Card/Card";
import Offers from "../Components/Offers/Offers";
import Products from "../Components/Products/Products";
// import { uploads } from "../improt";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 items-center justify-center">
        <Products />
      </div>
      <Offers />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 items-center justify-center">
        <Card />
        <Card />
        <Card />
      </div>
      <Offers />
    </>
  );
};

export default Home;
