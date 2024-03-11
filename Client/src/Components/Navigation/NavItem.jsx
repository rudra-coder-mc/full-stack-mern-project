import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const NavItem = (prop) => {
  const { NavItemStyle } = prop;
  const { user } = useContext(AuthContext);
  const [User, setUser] = useState();
  useEffect(() => {
    (async () => {
      const response = await user;
      console.log(response);
      setUser(response);
    })();
  }, [user]);
  console.log(user);

  return User ? (
    <ul className={NavItemStyle}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/ProductInsertPage">Inset Product</NavLink>
      </li>
      <li>
        <NavLink to="/ProductEditePage">Edite Product</NavLink>
      </li>
    </ul>
  ) : (
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
  );
};

export default NavItem;
