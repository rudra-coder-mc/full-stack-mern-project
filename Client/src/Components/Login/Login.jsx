import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bgLogin from "../../assets/bgLogin.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Feachers/Auth/AuthSlice";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // State to store any errors
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleError = (error) => {
    if (error.response) {
      return error.response.data.message || "An error occurred.";
    } else if (error.request) {
      return "No response received from the server. Please check your internet connection.";
    } else {
      return "An error occurred while processing your request.";
    }
  };
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const useLogin = async (data) => {
    try {
      const response = await axiosInstance.post(`/api/v1/login`, data, {
        "Content-Type": "application/json",
      });
      return response.data;
    } catch (error) {
      console.log(error);
      setError(handleError(error));
      return handleError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await useLogin(user);
    // console.log(response);

    if (response.success == true) {
      dispatch(
        login({
          Token: response.token,
          userData: response.user,
        })
      );
      // console.log(response.user.role);
      if (response.user.role == "admin") {
        navigate("/Dashboard/Home");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center   py-12 px-4 sm:px-6 lg:px-8 relative bg-cover bg-no-repeat bg-center  w-full h-full "
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="max-w-md w-full space-y-8 p-4 rounded-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            login to your UNIQ`S Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />

          <div className="rounded-md shadow-sm ">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={user.email}
                onChange={(e) =>
                  setUser((pre) => ({ ...pre, email: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                value={user.password}
                onChange={(e) =>
                  setUser((pre) => ({ ...pre, password: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            {/* <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              login
            </button>
          </div>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don`t have an account?{" "}
            <NavLink
              to="/signup"
              className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >
              {" "}
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
