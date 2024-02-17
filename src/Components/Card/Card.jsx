import productImage from "../../assets/img1.jpg";

const Card = () => {
  const product = {
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    starRating: 5,
    price: {
      old: 799,
      new: 599,
    },
    imageUrl: productImage,
  };

  return (
    <div className="w-full max-w-sm bg-blue-200 border border-gray-200 rounded-lg shadow">
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src={product.imageUrl}
          alt="Product"
        />
      </a>
      <div className="p-5">
        <a href="#" className="mb-3 block">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center mb-2">
          {[...Array(product.starRating)].map((_, index) => (
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
            {product.starRating}
          </span>
        </div>
        <p className="mb-3 text-gray-700">{product.description}</p>
        <div className="flex justify-between mb-2">
          <div className="text-sm text-gray-500">
            Old Price: <del>${product.price.old}</del>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            New Price: ${product.price.new}
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.new}
          </span>
          <a
            href="#"
            className="inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
