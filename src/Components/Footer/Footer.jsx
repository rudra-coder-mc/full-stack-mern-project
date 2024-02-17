const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-16 h-16 mx-auto mb-4"
            />
            <p className="text-sm text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              adipiscing erat.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg mb-2">About Us</h3>
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
              <li>123 Main Street</li>
              <li>City, State ZIP</li>
              <li>Email: info@example.com</li>
              <li>Phone: 123-456-7890</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
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
