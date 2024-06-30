import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import bgLogin from "../assets/bgLogin.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Feachers/Auth/AuthSlice";
import axiso from "axios";

const handleError = (error) => {
  if (error.response) {
    return error.response.data.message || "An error occurred.";
  } else if (error.request) {
    return "No response received from the server. Please check your internet connection.";
  } else {
    return "An error occurred while processing your request.";
  }
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const data = { name, email, password };
    console.log(data);
    try {
      const response = await axiso.post("/api/v1/register", data);

      console.log(response.data);

      if (response.data.success) {
        console.log("Signup successful!");
        dispatch(
          login({
            Token: response.data.token,
            userData: response.data.user,
          })
        );
        navigate("/");
      } else {
        console.log(response.data.message);
        setEmail(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setEmail(handleError(error));
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 relative bg-cover bg-no-repeat bg-center  w-full h-full "
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="max-w-md w-full space-y-8  p-4 rounded-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up to your UNIQ`S Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="user-name" className="sr-only">
                user name
              </label>
              <input
                id="user-name"
                name="user name"
                type="text"
                autoComplete="text"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="User Name"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email address"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
              />
            </div>
          </div>
          {error && (
            <span className="text-red-500 font-bold text-sm block mb-4">
              {error}
            </span>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            already have account?{" "}
            <NavLink
              to="/login"
              className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >
              {" "}
              LogIn
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signup;
