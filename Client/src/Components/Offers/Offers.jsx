import { Link } from "react-router-dom";

const Offers = (prop) => {
  const { data } = prop;
  console.log(data);
  const offerData = {
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    buttonText: data.buttonText,
    buttonUrl: data.buttonUrl,
    imageUrl: data.image,
  };

  return (
    <div className="flex-1 bg-blue-200 flex items-center justify-center m-4 p-4 ">
      <div className="flex flex-col justify-center items-center w-1/2 gap-6">
        <h1 className="sm:text-[1.5rem] md:text-[2.5rem] xl:text-[3.5rem] font-semibold">
          {offerData.title}
        </h1>
        <h2 className=" sm:text-[1rem] md:text-[2rem] xl:text-[3rem] font-medium">
          {offerData.subtitle}
        </h2>
        <p className="sm:text-[0.5rem] md:text-[1rem] xl:text-[2rem font-normal">
          {offerData.description}
        </p>
        <button className="text-gray-900 hover:text-white bg-gray-200 hover:bg-gray-800 border border-gray-800 hover:border-transparent focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center">
          <Link to={offerData.buttonUrl}>{offerData.buttonText}</Link>
        </button>
      </div>
      <div className="w-1/2">
        <img src={offerData.imageUrl} className="rounded-xl max-h-96" alt="" />
      </div>
    </div>
  );
};

export default Offers;
