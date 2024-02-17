import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = (prop) => {
  const { to, label } = prop;
  return (
    <li>
      <NavLink to={to} className="hover:text-gray-300">
        {label}
      </NavLink>
    </li>
  );
};
NavItem.prototype = {
  prop: PropTypes.node,
};
export default NavItem;
