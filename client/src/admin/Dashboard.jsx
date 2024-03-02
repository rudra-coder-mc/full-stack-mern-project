import React from "react";
import SideBar from "./Sidebar/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function Dashboard() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboards" element={<SideBar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Dashboard;
