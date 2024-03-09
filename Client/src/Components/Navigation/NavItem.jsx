import { NavLink } from "react-router-dom";

const NavItem = (prop) => {
  const { NavItemStyle } = prop;
  return (
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
