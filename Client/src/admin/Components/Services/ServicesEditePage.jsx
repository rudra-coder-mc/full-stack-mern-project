// const ServicesEditePage = () => {
//   return <div>ServicesEditePage</div>;
// };
// export default ServicesEditePage;
import { useContext, useState } from "react";
import { ServicesContex } from "../../../Context/ServicesContex";
import axios from "axios";
import { Link } from "react-router-dom";

const ServicesEditePage = () => {
  const { data, loading, error, fetchData } = useContext(ServicesContex); // Access context Serviceserties
  const axiosInstance = axios.create({ withCredentials: true });

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const [isLoading, setIsLoading] = useState(false);

  const handelDelete = async (id) => {
    setIsLoading(true);
    let url = `http://localhost:4000/api/v1/admin/service/${id}`;
    try {
      await axiosInstance.delete(url);
      fetchData();
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <p>Loading Services...</p>; // Render loading indicator
  }

  if (error) {
    return  <div className="flex flex-col items-center p-4"><p>Error fetching Services: {error}</p>
     <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchData}
        >
          Retry
        </button></div>; // Handle errors gracefully
  }

  return (
    <div className="mx-4 overflow-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 items-center justify-center">
      {data.map((Services) => (
        <div key={Services._id}>
          <div className="w-full max-w-72 bg-white border border-gray-200 rounded-lg shadow p-3">
            <img
              className="p-2 rounded-3xl h-40"
              src={Services.image[0].url}
              alt="Services"
            />

            <div className="p-1">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                {Services.name}
              </h5>

              <div className="flex items-center mb-2">
                {[...Array(Services.ratings)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-3">
                  {Services.ratings}
                </span>
              </div>

              {!showFullDescription && (
                <p className="mb-3 text-gray-700">
                  {Services.description.slice(0, 70)}...
                  <span
                    onClick={toggleDescription}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    Read More
                  </span>
                </p>
              )}
              {showFullDescription && (
                <p className="mb-3 text-gray-700">
                  {Services.description.slice(0, 100)}
                  <span
                    onClick={toggleDescription}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    Read Less
                  </span>
                </p>
              )}

              <div className="flex justify-between mb-2">
                <div className="text-sm font-semibold text-gray-900">
                  {/* New Price: ${Services.price.new} */}
                  category : {Services.category}
                </div>

                <div className="text-sm font-semibold text-gray-900">
                  {/* New Price: ${Services.price.new} */}
                  Booking Price: ₹ {Services.price}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  className="inline-block bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => {
                    handelDelete(Services._id);
                  }}
                >
                  {isLoading ? "isloadin" : "Delete"}
                </button>
                {/* <button
                  className="inline-block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => {
                    handelEdite(Services._id);
                  }}
                >
                  Edite
                </button> */}
                <Link to={`ServicesUpdate/${Services._id}`}>
                  <button className="inline-block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-white font-medium rounded-lg text-sm px-5 py-2.5">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesEditePage;
