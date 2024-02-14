import Hero from "../Components/Hero/Hero";
import Card from "../Components/Card/Card";
import Offers from "../Components/Offers/Offers";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex items-center justify-center gap-3 ">
        <Card />
        <Card />
        <Card />
      </div>
      <Offers />
      <div className="flex items-center justify-center gap-3 ">
        <Card />
        <Card />
        <Card />
      </div>
      <Offers />
    </>
  );
};
export default Home;
