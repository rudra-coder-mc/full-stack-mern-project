import { Outlet } from "react-router-dom";
import { SideBar } from "./";

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
