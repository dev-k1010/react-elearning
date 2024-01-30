import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {  Dropdown } from "antd";
import {
  LogoutOutlined,
  FormOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { infoDetailUser } from "../../redux/User/action/callApi";

export default function Menu() {
  let user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const handleDetail = () => {
    dispatch(infoDetailUser(user));
  };
  const handleButton = ({ login, logOut, signUp, accountPage }) => {
    if (login) {
      window.location.href = "/login";
    }
    if (logOut) {
      window.location.href = "/";
      localStorage.removeItem("USER_INFO");
      localStorage.removeItem("DETAIL_USER");
      localStorage.removeItem("FILTER");
      localStorage.removeItem("PAGE");
    }
    if (signUp) {
      window.location.href = "/signUp";
    }
    if (accountPage) {
      dispatch(infoDetailUser(user));
      window.location.href = `/account/${user.taiKhoan}`;
    }
  };

  const items = [
    {
      key: "1",
      label: user && (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 bg-color2 rounded-full flex items-center justify-center mr-2 col-span-1">
            <span className="text-white font-bold text-sm">
              {user.hoTen && user.hoTen.length > 0 ? user.hoTen[0] : "N/A"}
            </span>
          </div>
          <div className="grid grid-rows-2 text-black">
            <span>{user.hoTen}</span>
            <span className="text-xs">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      icon:
        user.maLoaiNguoiDung === "GV" ? <SettingOutlined /> : <UserOutlined />,
      label: (
        <button
          className="px-4 py-2 text-xs"
          onClick={() => handleButton({ accountPage: true })}
        >
          {user.maLoaiNguoiDung === "GV" ? <>Administration</> : <>Account</>}
        </button>
      ),
    },
    {
      key: "3",
      icon: <FormOutlined />,
      label: (
        <button
          className="px-4 py-2 text-xs"
          onClick={() => {
            handleButton({ signUp: true });
          }}
        >
          Sign Up
        </button>
      ),
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: (
        <button
          className="px-4 py-2 text-xs"
          onClick={() => {
            handleButton({ logOut: true });
          }}
        >
          Logout
        </button>
      ),
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <div className=" flex justify-end items-center space-x-2">
      {user && (
        <Dropdown arrow menu={menuProps}>
          {user.taiKhoan ? (
            <span className="w-10 h-10 bg-color2 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">
                {user.hoTen[0]}
              </span>
            </span>
          ) : (
            <>
              <button
                onClick={() => {
                  handleButton({ signUp: true });
                }}
                className="px-3 py-2 text-xs bg-color4 border-2"
              >
                Sign up
              </button>
              <button
                onClick={() => {
                  handleButton({ login: true });
                }}
                className="px-3 py-2 bg-black text-xs  border-2"
              >
                Log in
              </button>
            </>
          )}
        </Dropdown>
      )}
    </div>
  );
}
