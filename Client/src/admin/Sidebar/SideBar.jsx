import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-64 bg-gray-800">
        {/* SideBar content */}
        <div className="p-4 text-white">
          {/* SideBar heading */}
          <h2 className="text-lg font-semibold mb-4">SideBar</h2>
          {/* SideBar links */}
          <ul>
            <li className="py-2 hover:bg-gray-700">
              <NavLink to="/Dashbord/page1">page1</NavLink>
            </li>
            <li className="py-2 hover:bg-gray-700">
              <NavLink to="/Dashbord/page2">page2</NavLink>
            </li>
            <li className="py-2 hover:bg-gray-700">
              <NavLink to="/Dashbord/page3">page3</NavLink>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
      <div>
        {/* Main content */}
        <div className="p-4">Main Content</div>
      </div>
    </div>
  );
};

export default SideBar;
