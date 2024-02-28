import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// import { FaSignOutAlt } from "react-icons/fa";

const AuthButton = (prop) => {
  const { to, label } = prop;
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <NavLink to={to}>{label}</NavLink>
      </button>
    </>
  );
};

AuthButton.prototype = {
  prop: PropTypes.node,
};

export default AuthButton;
