import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import SearchItem from "./SearchItem";
import Category from "./Category";
import { useDispatch } from "react-redux";
import { callCategoryCourse } from "../../redux/User/action/callApi";
import Menu from "./Menu";

export default function HeaderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callCategoryCourse());
  }, [dispatch]);

  return (
    <div className="text-white  w-full fixed z-20 bg-color3 ">
      <div className="grid grid-cols-8 h-16  space-x-3 mx-3 font-thin">
        <div className="col-span-2 flex items-center justify-start space-x-5 cursor-pointer ">
          <NavLink to={"/"} className="flex items-center ">
            <h2 className="text-color4 text-xl font-medium">Cybersoft</h2>
          </NavLink>
          <span className="text-sm ">
            <Category />
          </span>
        </div>

        <div className="col-span-6 grid grid-cols-5 justify-center items-center">
          <span className="col-span-4">
            <SearchItem />
          </span>
          <span className="col-span-1 font-medium">
            <Menu />
          </span>
        </div>
      </div>
    </div>
  );
}
