import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaSignOutAlt } from "react-icons/fa";

const AuthButton = () => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <NavLink to="/login" className={"flex gap-1"}>
          <FaSignOutAlt className="relative top-1" />
          Log In
        </NavLink>
      </button>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <NavLink to="/signup" className={"flex gap-1"}>
          <FaSignInAlt className="relative top-1" />
          Sign Up
        </NavLink>
      </button> */}
    </>
  );
};

AuthButton.prototype = {
  prop: PropTypes.node,
};

export default AuthButton;
