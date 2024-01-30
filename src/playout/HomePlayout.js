import React from "react";
import HeaderPage from "../components/Header/HeaderPage";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
export default function HomePlayout() {
  return (
    <div>
      <HeaderPage />
      <Outlet />
      <Footer />
    </div>
  );
}
