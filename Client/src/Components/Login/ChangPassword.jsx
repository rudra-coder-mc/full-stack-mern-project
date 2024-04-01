import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangPassword = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState(null); // State to store any errors
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the request
    const data = { oldPassword, newPassword, confirmPassword };

    try {
      // Send POST request to your backend API endpoint
      const response = await axios.post(
        "http://localhost:4000/api/v1/password/update",
        data
      );

      // Handle successful login (e.g., redirect, store user data)
      console.log("Login successful!", response.data);

      // Example: store token in local storage for future requests
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (error) {
      // Handle errors here, e.g., display error message to the user
      setError(error.response?.data?.message || "Login failed.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border p-4 rounded-xl bg-cyan-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change Password to your UNIQ`S Account
          </h2>
        </div>
        <form
          className="max-w-md w-full space-y-8 p-4 rounded-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="oldPassword" className="sr-only">
                old Password
              </label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="oldPassword"
                autoComplete="oldPassword"
                required
                value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="oldPassword"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">
                newPassword
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="current-password"
                required
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                confirmPassword
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {error && (
            <span className="text-red-500 font-bold text-sm block mb-4">
              {error}
            </span>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-white">
            go to{" "}
            <NavLink
              to="/MyAccount"
              className="text-danger text-white transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >
              {" "}
              MyAccount
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
export default ChangPassword;
