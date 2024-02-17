import Hero from "../Components/Hero/Hero";
import Card from "../Components/Card/Card";
import Offers from "../Components/Offers/Offers";
import Footer from "../Components/Footer/Footer";

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
      <Footer />
    </>
  );
};
export default Home;
