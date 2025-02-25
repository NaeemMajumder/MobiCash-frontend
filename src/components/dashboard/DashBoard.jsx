import React from "react";
import Sidebar from "../sideBar/SideBar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <>
      <Sidebar />
      <Outlet></Outlet>
    </>
  );
};

export default DashBoard;
