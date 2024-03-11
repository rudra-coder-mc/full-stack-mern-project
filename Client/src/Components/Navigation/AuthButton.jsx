import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
// import { FaSignOutAlt } from "react-icons/fa";

const AuthButton = () => {
  // setisLogin(token ? true : false);
  const { logout, token } = useContext(AuthContext);
  const [Token, setToken] = useState(null);
  // // setToken(localStorage.getItem("token"));
  useEffect(() => {
    (async () => {
      const response = await token;
      console.log(response);
      setToken(response);
    })();
  }, [token]);
  console.log(Token);

  const handelLogout = async () => {
    const result = await logout();
    if (result == true) {
      console.log(`logout success ${result}`);
      setToken(null);
    } else {
      console.log(`logout error ${result}`);
    }

    // console.log(token);
  };

  return (
    <>
      {Token ? (
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
