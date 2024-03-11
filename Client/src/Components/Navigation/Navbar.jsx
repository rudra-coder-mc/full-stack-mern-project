import { NavLink } from "react-router-dom";
import final_logo from "../../assets/final_logo.png";
import NavItem from "./NavItem";
import AuthButton from "./AuthButton";
import { useState, useContext, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthProvider";
const Navbar = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false); // Use clear variable name

  useEffect(() => {
    (async () => {
      const response = await user;
      // console.log(response);
      if (response == "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    })();
  }, [user]);
  // console.log(localStorage.getItem("token"));
  const toggleMenu = () => setmenuOpened(!menuOpened);
  return (
    <header className="m-auto w-full bg-[#176B87] text-white right-1 z-10">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <NavLink to="/">
            <img src={final_logo} className="w-12 h-12" alt="logo" />
          </NavLink>
        </div>
        <div>
          <NavItem NavItemStyle={"hidden md:flex gap-x-5 xl:gap-x-10 "} />
          <NavItem
            NavItemStyle={`${
              menuOpened
                ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-gray-100 shadow-md w-34 text-black rounded-md font-medium right-1 ring-slate-900/5 transition-all duration-300 z-10"
                : "hidden"
            }`}
          />
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
          {!isAdmin && (
            <div className="flex items-center justify-between sm:gap-x-6 gap-2 ">
              <NavLink to="/Cart" className={"flex"}>
                <FaOpencart className="p-1 ring-1 ring-white-900/30 h-8 w-8 rounded-full" />
                <span className="relative w-5 h-5 rounded-full -top-2">0</span>
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
