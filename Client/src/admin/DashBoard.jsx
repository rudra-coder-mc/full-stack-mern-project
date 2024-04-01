import { Outlet, Routes, Route } from "react-router-dom";
import SideBar from "./Components/Sidebar/SideBar";

import ProductInsertPage from "./Components/Product/ProductInsertPage";
// import DHome from "./Components/DHome/DHome";
// import ProductEditePage from "./Components/Product/ProductEditePage";
// import ServicesInsertPage from "./Components/Services/ServicesInsertPage";
// import ServicesEditePage from "./Components/Services/ServicesEditePage";
// import ProductReport from "./Components/Report/ProductReport";
// import ServiceReport from "./Components/Report/ServiceReport";
// import UserReport from "./Components/Report/UserReport";
// import TodyAppointments from "./Components/Report/TodyAppointments";
// import ProductUpdate from "./Components/Product/ProductUpdate";
// import ServicesUpdate from "./Components/Services/ServicesUpdate";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <Outlet>
          <Routes>
            <Route
              path="/Dashboard/ProductInsert"
              element={<ProductInsertPage />}
            />
            {/* <Route path="/Dashboard/Home" element={<DHome />} />

            <Route
              path="/Dashboard/ProductInsert"
              element={<ProductInsertPage />}
            />
            <Route
              path="/Dashboard/ProductEdite"
              element={<ProductEditePage />}
            />
            <Route
              path="/Dashboard/ServicesInsert"
              element={<ServicesInsertPage />}
            />
            <Route
              path="/Dashboard/ServicesEdite"
              element={<ServicesEditePage />}
            />

            <Route path="/Dashboard/ProductRepor" element={<ProductReport />} />
            <Route
              path="/Dashboard/ServiceReport"
              element={<ServiceReport />}
            />
            <Route path="/Dashboard/UserReport" element={<UserReport />} />
            <Route
              path="/Dashboard/TodyAppointments"
              element={<TodyAppointments />}
            />
            <Route
              path="/Dashboard/ProductEdite/ProductUpdate/"
              element={<ProductUpdate />}
            >
              <Route path=":ProductUpdateId" element={<ProductUpdate />} />
            </Route>
            <Route
              path="/Dashboard/ServicesEdite/ServicesUpdate/"
              element={<ServicesUpdate />}
            >
              <Route path=":ServicesUpdateId" element={<ServicesUpdate />} />
            </Route> */}
          </Routes>
        </Outlet>
      </div>
    </>
  );
};

export default Dashboard;
