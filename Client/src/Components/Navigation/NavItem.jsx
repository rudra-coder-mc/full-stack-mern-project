import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const NavItem = (prop) => {
  const { NavItemStyle } = prop;
  const { isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        // Show loading indicator while user data is being fetched
        <p>Loading...</p>
      ) : (
        <>
          <ul className={NavItemStyle}>
            <li className="hover:bg-white hover:text-black">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:bg-white hover:text-black">
              <NavLink to="/ProductCategory">Product</NavLink>
            </li>
            <li className="hover:bg-white hover:text-black">
              <NavLink to="/ServicesCategory">Service</NavLink>
            </li>
            <li className="hover:bg-white hover:text-black">
              <NavLink to="/MyAccount">MyAccount</NavLink>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default NavItem;
