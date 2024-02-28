import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

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
NavItem.prototype = {
  NavItemStyle: PropTypes.node,
};
export default NavItem;
