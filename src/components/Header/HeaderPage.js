import Search from "antd/es/input/Search";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import MenuItem from "./MenuItem";
import SearchItem from "./SearchItem";

export default function HeaderPage() {
  const navigate = useNavigate();
  const renderButton = () => {};
  const renderMenu = () => {};
  return (
    <div className="text-black  w-full ">
      <div className="flex flex-row justify-between items-center h-16 mx-3">
        {/* LOGO */}
        <div className="flex items-center">
          <img src="./logoCyber.png" className="w-10 h-10 " />
          <h2>Cybersoft</h2>
        </div>
        {/* MENU ITEM*/}
        <div>
          <MenuItem />
        </div>
        {/* SEARCH */}
        <div>
          <SearchItem />
        </div>
        <div className="flex justify-center items-center space-x-2">
          {/* LOGIN | LOGOUT */}
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-4 py-2 bg-white text-xs border-black border-2"
          >
            Log in
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-4 py-2 text-xs bg-color4 border-color4 border-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
