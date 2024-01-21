import Hero from "../Components/Hero/Hero";
import Card from "../Components/Card/Card";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex-1 flex items-center justify-center gap-3 ">
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};
export default Home;
