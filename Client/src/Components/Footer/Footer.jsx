import logo from "../../assets/tirthlogo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <img
              src={logo}
              alt="Company Logo"
              className="w-16 h-16 mx-auto mb-4"
            />
            <p className="text-sm text-center">YOUR CAR NEEDS MORE</p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg mb-2">
              <a href="aboutus" className="hover:text-blue-400">
                About Us
              </a>
            </h3>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Mission
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Vision
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg mb-2">Contact Us</h3>
            <ul className="text-sm">
              <li>12 UNIQ`S Studio</li>
              <li>vesu , surat</li>
              <li>Email: uniqauto11@gmail.com</li>
              <li>Phone: 9432786534</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm">
          © 2024 UNIQ`S AUTOMOTIVE. All rights reserved.
        </p>
        <p className="text-sm">
          Built with{" "}
          <a
            href="https://reactjs.org/"
            className="text-blue-400 hover:text-blue-300"
          >
            React
          </a>{" "}
          and{" "}
          <a
            href="https://tailwindcss.com/"
            className="text-blue-400 hover:text-blue-300"
          >
            Tailwind CSS
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
