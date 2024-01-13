import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold">Logo</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <NavLink to="/" className="hover:text-gray-300">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className="hover:text-gray-300">
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-gray-300">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-gray-300">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/service" className="hover:text-gray-300">
                  Service
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

