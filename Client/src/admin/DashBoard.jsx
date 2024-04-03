import { Outlet } from "react-router-dom";
import SideBar from "./Components/Sidebar/SideBar";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
