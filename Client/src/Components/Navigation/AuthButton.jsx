import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const { logout, token } = useContext(AuthContext);
  const [localToken, setLocalToken] = useState(token); // Sync with context
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLocalToken(true);
    }

    // console.log(token); // Update local state when context changes
  }, [token]);
  // console.log(localToken);

  const handleLogout = async () => {
    setLocalToken(false); // Clear local token immediately
    try {
      await logout(); // Perform logout asynchronously
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout errors if needed (e.g., display a message)
    }
  };

  return (
    <>
      {localToken ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleLogout}
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
