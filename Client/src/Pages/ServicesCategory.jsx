import Services from "../Components/Services/Services";

const ServicesCategory = () => {
  return (
    <>
      <div className="my-3 mx-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 items-center justify-center">
        <Services />
      </div>
    </>
  );
};
export default ServicesCategory;
