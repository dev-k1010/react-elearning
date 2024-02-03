import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import {
  callCategoryCourse,
  callListCourse,
} from "../../redux/User/action/callApi";
import MenuAccount from "./MenuAccount";
import { Dropdown, Space } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

export default function HeaderPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  useEffect(() => {
    dispatch(callListCourse());
    dispatch(callCategoryCourse());
  }, [dispatch]);

  const [visible, setVisible] = useState(false);
  const items = [
    {
      label: (
        <span className=" col-span-1 text-white font-medium">
          <MenuAccount />
        </span>
      ),
      key: "2",
    },
    {
      label: (
        <span>
          <SearchItem />
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span className="text-sm flex items-center justify-end">
          <Category />
        </span>
      ),
      key: "1",
    },
  ];
  const renderMobile = () => {
    return (
      <div className="grid grid-cols-2 h-16  space-x-3 mx-3 font-thin ">
        <div className=" col-span-1 flex items-center justify-start space-x-5 cursor-pointer ">
          <NavLink to={"/"} className="flex items-center ">
            <h2 className="text-color4 text-2xl font-medium">Cybersoft</h2>
          </NavLink>
        </div>

        <div className=" col-span-1 space-x-3 flex justify-end items-center ">
          {user ? (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              visible={visible}
              onVisibleChange={(v) => setVisible(v)}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuUnfoldOutlined className="text-3xl" />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <span className=" col-span-1 text-white font-medium">
              <MenuAccount />
            </span>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className=" text-white  w-full  bg-color3 ">
      <div className="hidden lg:block">
        <div className=" grid grid-cols-9 h-16  space-x-3 mx-3 font-thin ">
          <div className="col-span-3 flex items-center justify-start space-x-5 cursor-pointer ">
            <NavLink to={"/"} className="flex items-center ">
              <h2 className="text-color4 text-xl font-medium">Cybersoft</h2>
            </NavLink>
            <span className="text-sm flex items-center justify-center col-span-2 border-red-700">
              <Category />
            </span>
          </div>
          <div className="col-span-6 grid grid-cols-5 justify-center items-center">
            <span className="col-span-4">
              <SearchItem />
            </span>
            <span className="col-span-1 font-medium">
              <MenuAccount />
            </span>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">{renderMobile()}</div>
    </div>
  );
}
