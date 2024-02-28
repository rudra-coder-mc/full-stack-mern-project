import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = (prop) => {
  const { NavItemStyle } = prop;
  return (
    <ul className={NavItemStyle}>
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
  );
};
NavItem.prototype = {
  NavItemStyle: PropTypes.node,
};
export default NavItem;
