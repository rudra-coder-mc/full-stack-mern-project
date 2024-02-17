import { NavLink } from "react-router-dom";
import final_logo from "../../assets/final_logo.png";

const Navbar = () => {
  return (
    <header className="bg-[#176B87] text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <NavLink to="/">
            <img src={final_logo} className="w-12 h-12" alt="logo" />
          </NavLink>
        </div>
        <ul className="flex items-center space-x-4">
          <NavItem to="/" label="Home" />
          <NavItem to="/product" label="Product" />
          <NavItem to="/service" label="Service" />
        </ul>
        <div className="flex items-center space-x-4">
          <AuthButton to="/login" label="Log In" />
          <AuthButton to="/signup" label="Sign Up" />
        </div>
      </nav>
    </header>
  );
};

const NavItem = ({ to, label }) => {
  return (
    <li>
      <NavLink to={to} className="hover:text-gray-300">
        {label}
      </NavLink>
    </li>
  );
};

const AuthButton = ({ to, label }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      <NavLink to={to}>{label}</NavLink>
    </button>
  );
};

export default Navbar;
