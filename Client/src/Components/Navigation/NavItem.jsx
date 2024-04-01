import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const NavItem = (prop) => {
  const { NavItemStyle } = prop;
  const { isLoading } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {isLoading ? (
        // Show loading indicator while user data is being fetched
        <p>Loading...</p>
      ) : (
        <>
          <ul className={NavItemStyle}>
            <li className={`px-4 py-2 hover:bg-white hover:text-black hover:rounded hover:shadow-2xl hover:transition hover:duration-300 hover:ease-in-out ${location.pathname === '/' ? 'bg-white text-black rounded shadow-2xl transition duration-300 ease-in-out' : ''}`}>
              <NavLink exact to="/">Home</NavLink>
            </li>
            <li className={`px-4 py-2 hover:bg-white hover:text-black hover:rounded hover:shadow-2xl hover:transition hover:duration-300 hover:ease-in-out ${location.pathname === '/ProductCategory' ? 'bg-white text-black rounded shadow-2xl transition duration-0 ease-in-out' : ''}`}>
              <NavLink to="/ProductCategory">Product</NavLink>
            </li>
            <li className={`px-4 py-2 hover:bg-white hover:text-black hover:rounded hover:shadow-2xl hover:transition hover:duration-300 hover:ease-in-out ${location.pathname === '/ServicesCategory' ? 'bg-white text-black rounded shadow-2xl transition duration-0 ease-in-out' : ''}`}>
              <NavLink to="/ServicesCategory">Service</NavLink>
            </li>
            <li className={`px-4 py-2 hover:bg-white hover:text-black hover:rounded hover:shadow-2xl hover:transition hover:duration-300 hover:ease-in-out ${location.pathname === '/MyAccount' ? 'bg-white text-black rounded shadow-2xl transition duration-0 ease-in-out' : ''}`}>
              <NavLink to="/MyAccount">MyAccount</NavLink>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default NavItem;
