import img1 from "../../assets/img1.jpg";

const Hero = () => {
  return (
    <>
      <div className="Hero flex justify-center items-center m-3 p-3 gap-3 ">
        <div className="Hero-left flex flex-col justify-center items-center gap-3">
          <h2 className="text-lg font-semibold size-1/3 text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
            eligendi veniam maiores quis
          </h2>
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 "
          >
            Lern more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
        <div className="Hero-right">
          <img src={img1} className=" rounded-3xl" alt="hero-image" />
        </div>
      </div>
    </>
  );
};
export default Hero;
