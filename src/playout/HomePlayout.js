import React from "react";
import HeaderPage from "../components/Header/HeaderPage";
import { Outlet } from "react-router-dom";
export default function HomePlayout() {
  return (
    <div >
      <HeaderPage />
      <Outlet />
    </div>
  );
}
