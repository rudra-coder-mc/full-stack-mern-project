import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className=" bg-[#176B87] text-white">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold">Logo</div>
          <ul className="flex items-center space-x-4">
            <li>
              <NavLink to="/" className="hover:text-gray-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" className="hover:text-gray-300">
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" className="hover:text-gray-300">
                Service
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              <NavLink to="/Login">LogIn</NavLink>
            </button>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              <NavLink to="/signup">SignUp</NavLink>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
