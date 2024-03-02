import { NavLink } from "react-router-dom";

const NavItem = (prop) => {
  const { NavItemStyle } = prop;
  return (
    <ul className={NavItemStyle}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/product">Product</NavLink>
      </li>
      <li>
        <NavLink to="/service">Service</NavLink>
      </li>
    </ul>
  );
};

export default NavItem;
