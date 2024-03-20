import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { FaHome, FaSignInAlt } from "react-icons/fa";

const SideBar = () => {
  const { logout } = useContext(AuthContext);
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const [openServiceMenu, setOpenServiceMenu] = useState(false);
  const [openReportMenu, setOpenReportMenu] = useState(false);
  const navigate = useNavigate();
  const handleProductMenuClick = () => {
    setTimeout(() => {
      setOpenProductMenu(!openProductMenu);
      setOpenServiceMenu(false);
      setOpenReportMenu(false);
    }, 1000);
  };

  const handleServiceMenuClick = () => {
    setTimeout(() => {
      setOpenServiceMenu(!openServiceMenu);
      setOpenProductMenu(false);
      setOpenReportMenu(false);
    }, 1000);
  };
  const handleReportMenuClick = () => {
    setTimeout(() => {
      setOpenReportMenu(!openReportMenu);
      setOpenServiceMenu(false);
      setOpenProductMenu(false);
    }, 1000);
  };
  const handleLogout = async () => {
    try {
      await logout(); // Perform logout asynchronously
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout errors if needed (e.g., display a message)
    }
  };

  return (
    <>
      <div className="w-56 bg-[#222d32] h-scree">
        {/* SideBar content */}
        <div className="p-4 text-white">
          {/* SideBar heading */}
          <h2 className="text-lg font-semibold mb-4 flex">
            <FaHome className="mx-2 text-2xl" /> Dashboard
          </h2>
          {/* SideBar links */}
          <ul className="mt-3">
            <li
              className="py-2 hover:bg-gray-700 relative flex p-2 rounded"
              onMouseLeave={handleReportMenuClick}
              onMouseEnter={handleReportMenuClick}
            >
              <span
                className="flex items-center cursor-pointer"

                // onClick={handleReportMenuClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <NavLink to="/Dashboard/reports" className="mx-2">
                  Reports
                </NavLink>
              </span>
              {openReportMenu && (
                <ul className="w-48 absolute left-full top-0 mt-0 ml-4 bg-gray-700 text-gray-200 rounded">
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/ProductRepor"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ProductRepor
                    </NavLink>
                  </li>
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/ServiceReport"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ServiceReport
                    </NavLink>
                  </li>
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/UserReport"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      UserReport
                    </NavLink>
                  </li>
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/TodyAppointments"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      TodyAppointments
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="py-2 hover:bg-gray-700 relative flex p-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <NavLink to="/Dashboard/users" className="mx-2">
                Customers
              </NavLink>
            </li>
            <li
              className="py-2 hover:bg-gray-700 relative flex p-2 rounded"
              onMouseLeave={handleProductMenuClick}
              onMouseEnter={handleProductMenuClick}
            >
              <span
                className="flex items-center cursor-pointer"
                // onMouseOver={handleProductMenuClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                <NavLink to="/Dashboard/products" className="mx-2">
                  Product
                </NavLink>
              </span>
              {openProductMenu && (
                <ul className="w-48 absolute left-full top-0 mt-0 ml-4 bg-gray-700 text-gray-200 rounded">
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/productinsert"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Add Product
                    </NavLink>
                  </li>
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/ProductEdite"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      edit Products
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="py-2 hover:bg-gray-700 relative flex p-2 rounded"
              onMouseLeave={handleServiceMenuClick}
              onMouseEnter={handleServiceMenuClick}
            >
              <span
                className="flex items-center cursor-pointer"
                // onMouseOver={handleServiceMenuClick}

                // onClick={handleServiceMenuClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>

                <NavLink to="/Dashboard/services" className="mx-2">
                  Services
                </NavLink>
              </span>
              {openServiceMenu && (
                <ul className="w-48 absolute left-full top-0 mt-0 ml-4 bg-gray-700 text-gray-200 rounded">
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/ServicesInsert"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {" "}
                      {/* Consistent link path */}
                      Add Service
                    </NavLink>
                  </li>
                  <li className="py-2 hover:bg-gray-600">
                    <NavLink
                      to="/Dashboard/ServicesEdite"
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {" "}
                      {/* Consistent link path */}
                      Edit Service
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            {/* Add more links as needed */}
          </ul>
          <div className="mt-3">
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleLogout}
            >
              <FaSignInAlt />
              Log Out
            </button> */}
            <span className="flex cursor-pointer" onClick={handleLogout}>
              <FaSignInAlt className="text-2xl mx-2"/>
              Log Out
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
