import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/tirthlogo.png";
import { AuthButton } from "../";
import { useState, useContext, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { useCart } from "../../Context/ContextReducer";
const Navbar = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const isAdmin = useSelector((state) => state.Auth.userData.role);

  const { state } = useCart();

  const NavItem = [
    {
      name: "Home",
      Url: "/",
    },
    {
      name: "Product",
      Url: "/ProductCategory",
    },
    {
      name: "Services",
      Url: "/ServicesCategory",
    },
    {
      name: "MyAccount",
      Url: "/MyAccount",
    },
  ];

  const toggleMenu = () => setmenuOpened(!menuOpened);
  return (
    <header className="m-auto w-full bg-[#176B87] text-white right-1 z-10">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <NavLink to="/">
            <img
              src={logo}
              className=" w-12 h-12 bg-transparent mx-6"
              alt="logo"
            />
          </NavLink>
        </div>
        <div>
          <ul
          
            className={
              menuOpened
                ? `flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-gray-100 shadow-md w-34 text-black rounded-md font-medium  ring-slate-900/5 transition-all duration-300 z-10`
                : `hidden md:flex gap-x-5 xl:gap-x-10 `
            }
          >
            {NavItem.map((Item) => (
              <li
                key={Item.name}
                className={`px-4 py-2 hover:bg-white hover:text-black hover:rounded hover:shadow-2xl hover:transition hover:duration-300 hover:ease-in-out `}
              >
                <Link to={Item.Url}>{Item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between sm:gap-x-6 space-x-2 ">
          {!menuOpened ? (
            <MdMenu
              className="md:hidden cursor-pointer mr-2 p-1 ring-1 ring-white-900/30 h-8 w-8 rounded-full"
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className="md:hidden cursor-pointer mr-2 p-1 ring-1 ring-white-900/30 h-8 w-8 rounded-full"
              onClick={toggleMenu}
            />
          )}
          {isAdmin == "admin" && (
            <div className="flex items-center justify-between sm:gap-x-6 gap-2 ">
              <NavLink to="/Cart" className={"flex"}>
                <FaOpencart className="p-1 ring-1 ring-white-900/30 h-8 w-8 rounded-full" />
                <span className="relative w-5 h-5 rounded-full -top-2">
                  {state.length}
                </span>
              </NavLink>
            </div>
          )}
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
