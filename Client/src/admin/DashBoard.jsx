import { Outlet, Routes, Route } from "react-router-dom";
import SideBar from "./Components/Sidebar/SideBar";
import Page1 from "./Components/Page1";
import ProductInsertPage from "./Components/Product/ProductInsertPage";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <Outlet>
          <Routes>
            {/* <Route path="/users" element={<Page1 />} />  */}
            <Route path="/productinsert" element={<ProductInsertPage />} /> 
            
          </Routes>
        </Outlet>
      </div>
    </>
  );
};

export default Dashboard;
