import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { SubNav } from "../Components/";

const MyAccount = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  useEffect(() => {
    let data = localStorage.getItem("user");
    let user = JSON.parse(data);
    setUser(user);
  }, []);
  const [UserError, setUserError] = useState(null);
  // const [AddressError, setAddressError] = useState(null);
  const [UserMessage, setUserMessage] = useState(null);

  const [isLoding, setIsLoding] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const handleChangeForUser = (event) => {
    setUserMessage(null);
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  if (!user) {
    return (
      <>
        <p>User is not logged in.</p>
        <button
          className="bg-blue-500 text-white rounded-lg m-2 p-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </>
    );
  }
  // console.log(user);
  // console.log(address);
  const handleSubmitForUser = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoding(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axiosInstance.put(
        `http://localhost:4000/api/v1/me/update`,
        user,
        config
      );
      // console.log(response);

      setIsLoding(false); // Clear loading state
      let strUser = JSON.stringify(response.data.user);
      localStorage.setItem("user", strUser);
      setUserMessage("Update success..");
      return true;
    } catch (error) {
      setIsLoding(false); // Clear loading state
      return setUserError(error);
    }
  };

  return (
    <>
      <SubNav />

      <div className="overflow-auto mb-8 bg-blue-200 max-w-md mx-auto w-full space-y-8 border p-4 rounded-xl mt-8">
        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
          My Account
        </h2>

        {/* Display user info */}
        <div className="mb-4">
          <div>
            <p className="">
              <span className="font-semibold text-x">Name: </span>
              {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
          {/* Add other user info if available (e.g., role, createdAt) */}
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Update Profile
        </h2>
        <form
          className="w-full space-y-2 p-4 rounded-xl bg-gradient-to-r  from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          onSubmit={handleSubmitForUser}
        >
          <input type="hidden" name="remember" value="true" />

          {UserError && (
            <span className="text-red-500 font-bold text-sm block mb-4">
              {UserError}
            </span>
          )}
          {UserMessage && ( // Conditionally display error message
            <span className="text-black font-bold text-sm block mb-4">
              {UserMessage}
            </span>
          )}

          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="user-name" className="sr-only">
                User name
              </label>
              <input
                id="user-name"
                name="name"
                type="text"
                autoComplete="text"
                required
                value={user.name}
                onChange={handleChangeForUser}
                className="appearance-none bg-stone-100 rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                value={user.email}
                onChange={handleChangeForUser}
                className="appearance-none bg-stone-100 rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {/* Add other user info input fields if needed */}
          </div>

          <div className="text-sm">
            <NavLink
              to="/MyAccount/UpdatePassword"
              className="font-medium text-white hover:text-black"
            >
              Change your password?
            </NavLink>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoding}
            >
              {isLoding ? "Loding...." : "Update Profile"}
            </button>
            {/* Add another button for future actions if needed */}
          </div>
        </form>
      </div>
    </>
  );
};
export default MyAccount;
