import hero_img1 from "../../assets/hero_img1.jpeg";

const Offers = () => {
  return (
    <>
      <div className="flex-1 bg-[#B4D4FF]h-[60vh] flex items-center justify-center m-4 p-4">
        <div className="flex flex-col justify-center items-center w-1/2 gap-6">
          <h1 className="text-6xl font-semibold ">Exclusive</h1>
          <h2 className="text-5xl font-medium">Offers For you</h2>
          <p className="text-4xl font-normal">
            ONLY ON BEST PRODUCTS ANS SERIVCSE
          </p>
          <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 ">
            Check Now
          </button>
        </div>
        <div className=" w-1/2 ">
          <img src={hero_img1} className="rounded-xl" alt="" />
        </div>
      </div>
    </>
  );
};
export default Offers;
