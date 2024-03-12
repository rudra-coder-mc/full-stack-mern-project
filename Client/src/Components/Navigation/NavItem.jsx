import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const NavItem = (prop) => {
  const { NavItemStyle } = prop;
  const { user, isLoading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false); // Use clear variable name

  useEffect(() => {
    (async () => {
      const response = await user;
      // console.log(response);
      if (response == "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    })();
  }, [user]);

  return (
    <>
      {isLoading ? (
        // Show loading indicator while user data is being fetched
        <p>Loading...</p>
      ) : (
        <>
          {isAdmin && ( // Conditionally render admin links
            <ul className={NavItemStyle}>
              <li>
                <NavLink to="/ProductInsertPage">Insert Product</NavLink>
              </li>
              <li>
                <NavLink to="/ProductEditePage">Edit Product</NavLink>
              </li>
              <li>
                <NavLink to="/ServicesInsertPage">Insert Services</NavLink>
              </li>
              <li>
                <NavLink to="/ServicesEditePage">Edit Services</NavLink>
              </li>
            </ul>
          )}
          {!isAdmin && ( // Conditionally render non-admin links
            <ul className={NavItemStyle}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/ProductCategory">Product</NavLink>
              </li>
              <li>
                <NavLink to="/ServicesCategory">Service</NavLink>
              </li>
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default NavItem;
