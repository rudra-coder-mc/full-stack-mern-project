import React from "react";

const Sidebar = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-64 bg-gray-800">
        {/* Sidebar content */}
        <div className="p-4 text-white">
          {/* Sidebar heading */}
          <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
          {/* Sidebar links */}
          <ul>
            <li className="py-2 hover:bg-gray-700">
              <a href="#" className="block px-4">
                Link 1
              </a>
            </li>
            <li className="py-2 hover:bg-gray-700">
              <a href="#" className="block px-4">
                Link 2
              </a>
            </li>
            <li className="py-2 hover:bg-gray-700">
              <a href="#" className="block px-4">
                Link 3
              </a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
      <div >
        {/* Main content */}
        <div className="p-4">Main Content</div>
      </div>
    </div>
  );
};

export default Sidebar;
