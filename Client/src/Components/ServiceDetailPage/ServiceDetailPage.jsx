// const ServiceDetailPage = () => {
//   return <div>ServiceDetailPage</div>;
// };
// export default ServiceDetailPage;

// import { useNavigate } from "react-router-dom";
const ServiceDetailPage = (prop) => {
  //   const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <img
            src={prop.image}
            alt={prop.name}
            className="w-[80%] h-[70dvh] mb-4 rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{prop.name}</h1>
          <div className="flex items-center mb-2">
            {[...Array(prop.ratings)].map((_, index) => (
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
              {prop.ratings}
            </span>
          </div>
          <p className="text-black text-sm mb-4">{prop.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-green-500">
              {" "}
              Booking Price : ${prop.price}
            </span>
          </div>
          <p className="text-sm text-black mb-4">category : {prop.category}</p>

          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg `}
          >
            {" "}
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
