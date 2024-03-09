import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
// import { FaSignOutAlt } from "react-icons/fa";

const AuthButton = () => {
  // setisLogin(token ? true : false);
  const { logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const handelLogout = async () => {
    const result = await logout();
    console.log(result);
  };

  return (
    <>
      {token ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handelLogout}
        >
          Log Out
        </button>
      ) : (
        <>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <NavLink to="/login">Log In</NavLink>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <NavLink to="/signup">Sign Up</NavLink>
          </button>
        </>
      )}
    </>
  );
};

export default AuthButton;
