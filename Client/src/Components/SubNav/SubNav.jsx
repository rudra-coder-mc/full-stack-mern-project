import { NavLink } from "react-router-dom";

const SubNav = () => {
  return (
    <>
      <nav className="flex items-center justify-center mt-4">
        <NavLink
          to="/MyAccount"
          className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium"
        >
          Profile
        </NavLink>
        <NavLink
          to="/MyAddress"
          className="px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 active:text-blue-700 font-medium"
        >
          Address
        </NavLink>
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
    </>
  );
};
export default SubNav;
