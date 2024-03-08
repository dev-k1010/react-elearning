import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "antd";
import {
  LogoutOutlined,
  FormOutlined,
  SettingOutlined,
  UserOutlined,
  SolutionOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

export default function MenuAccount() {
  const user = useSelector((state) => state.userSlice.user);
  const handleButton = ({
    login,
    logOut,
    signUp,
    accountPage,
    managerUserPage,
    managerCoursePage,
  }) => {
    if (login) {
      window.location.href = "/login";
    }
    if (logOut) {
      window.location.href = "/";
      localStorage.removeItem("USER_INFO");
      localStorage.removeItem("DETAIL_USER");
      localStorage.removeItem("FILTER");
      localStorage.removeItem("PAGE");
      localStorage.removeItem("DETAIL_COURSE");
    }
    if (signUp) {
      window.location.href = "/signUp";
    }
    if (accountPage) {
      window.location.href = `/account/${user.taiKhoan}`;
    }
    if (managerUserPage) {
      window.location.href = `/managerUser`;
    }
    if (managerCoursePage) {
      window.location.href = `/managerCourse`;
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
        user && user.maLoaiNguoiDung === "GV" ? (
          <SettingOutlined />
        ) : (
          <UserOutlined />
        ),
      label: (
        <button
          className="px-4 py-2 text-xs"
          onClick={() => handleButton({ accountPage: true })}
        >
          {user && user.maLoaiNguoiDung === "GV" ? (
            <>Administration</>
          ) : (
            <>Account settings</>
          )}
        </button>
      ),
    },
    user &&
      user.maLoaiNguoiDung === "GV" && {
        key: "3",
        icon: <SolutionOutlined />,
        label: (
          <button
            className="px-4 py-2 text-xs"
            onClick={() => handleButton({ managerUserPage: true })}
          >
            <>Managerment User</>
          </button>
        ),
      },
    user &&
      user.maLoaiNguoiDung === "GV" && {
        key: "4",
        icon: <ProfileOutlined />,
        label: (
          <button
            className="px-4 py-2 text-xs"
            onClick={() => handleButton({ managerCoursePage: true })}
          >
            <>Managerment Course</>
          </button>
        ),
      },
    {
      key: "5",
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
      key: "6",
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
      {user && user.taiKhoan ? (
        <Dropdown arrow menu={menuProps}>
          <span className="w-10 h-10 bg-color2 rounded-full flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">
              {user.hoTen[0]}
            </span>
          </span>
        </Dropdown>
      ) : (
        <>
          <button
            onClick={() => {
              handleButton({ signUp: true });
            }}
            className="p-2 md:px-3 md:py-2 text-xs bg-color4 border-2"
          >
            Sign up
          </button>
          <button
            onClick={() => {
              handleButton({ login: true });
            }}
            className="p-2 md:px-3 md:py-2 bg-black text-xs  border-2"
          >
            Log in
          </button>
        </>
      )}
    </div>
  );
}
