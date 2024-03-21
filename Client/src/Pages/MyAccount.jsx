import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: 0,
    phoneNo: 0,
  });
  const [UserError, setUserError] = useState(null);
  // const [AddressError, setAddressError] = useState(null);
  const [UserMessage, setUserMessage] = useState(null);
  const [AddressMessage, setAddressMessage] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    let data = localStorage.getItem("user");
    let user = JSON.parse(data);
    setUser(user);
    let data2 = localStorage.getItem("address");
    let address = JSON.parse(data2);
    setAddress(address);
  }, []);

  const handleChangeForUser = (event) => {
    setUserMessage(null);
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleChangeForAddress = (event) => {
    setAddressMessage(null);
    setAddress({ ...address, [event.target.name]: event.target.value });
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
  const handleSubmitForAddress = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    let data = JSON.stringify(address);
    localStorage.setItem("address", data);
    setAddressMessage("Update success");
  };
  return (
    <>
      <nav className="flex items-center justify-center mt-4">
        <div className=" py-2 px-2 rounded bg-yellow-400 shadow shadow-yellow-400 hover:opacity-80">
          <NavLink
            to="/MyAccount"
            className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium"
          >
            Profile
          </NavLink>
        </div>
        <NavLink
          to="/MyOrder"
          className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium ml-2"
        >
          My Orders
        </NavLink>
        <NavLink
          to="/MyBooking"
          className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium ml-2"
        >
          My Bookings
        </NavLink>
      </nav>

      <div className="overflow-auto mb-8 bg-white max-w-md mx-auto w-full space-y-8 border p-4 rounded-xl mt-8">
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

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update Profile
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmitForUser}>
          <input type="hidden" name="remember" value="true" />

          {UserError && (
            <span className="text-red-500 font-bold text-sm block mb-4">
              {UserError}
            </span>
          )}
          {UserMessage && ( // Conditionally display error message
            <span className="text-green-500 font-bold text-sm block mb-4">
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
              to="/Login/UpdatePassword"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Change your password?
            </NavLink>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoding}
            >
              {isLoding ? "Loding...." : "Update Profile"}
            </button>
            {/* Add another button for future actions if needed */}
          </div>
        </form>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">shipping Address</h1>
          <form
            onSubmit={handleSubmitForAddress}
            className="flex flex-col space-y-4"
          >
            {/* {AddressError && ( // Conditionally display error message
              <span className="text-red-500 font-bold text-sm block mb-4">
                {AddressError}
              </span>
            )} */}
            {AddressMessage && ( // Conditionally display error message
              <span className="text-green-500 font-bold text-sm block mb-4">
                {AddressMessage}
              </span>
            )}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-medium mb-2">
                address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={address.address}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-medium mb-2">
                city
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={address.city}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="text-sm font-medium mb-2">
                state
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={address.state}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pinCode" className="text-sm font-medium mb-2">
                pinCode
              </label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={address.pinCode}
                onChange={handleChangeForAddress}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNo" className="text-sm font-medium mb-2">
                phoneNo
              </label>
              <input
                type="number"
                id="phoneNo"
                name="phoneNo"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // value={address.phoneNo}
                onChange={handleChangeForAddress}
                size="10"
                required
              />
            </div>

            {/* {AddressError && (
              <span className="text-red-500 font-bold text-sm block mb-4">
                {AddressError}
              </span>
            )} */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update shipping Address
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default MyAccount;
