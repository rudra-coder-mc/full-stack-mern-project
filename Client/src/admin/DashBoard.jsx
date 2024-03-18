import { Outlet, Routes } from "react-router-dom";
import SideBar from "./Components/Sidebar/SideBar";

// import ProductInsertPage from "./Components/Product/ProductInsertPage";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <Outlet>
          <Routes>
            {/* <Route path="/productinsert" element={<ProductInsertPage />} /> */}
          </Routes>
        </Outlet>
      </div>
    </>
  );
};

export default Dashboard;
