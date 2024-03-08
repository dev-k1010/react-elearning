import {
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { AutoComplete, Dropdown, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoDetailUser } from "../../redux/User/action/callApi";
import CardItem from "../Card/CardItem";
import unidecode from "unidecode";

export default function Shop() {
  const user = useSelector((state) => state.userSlice.user);
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  const courseArr = detailUser.chiTietKhoaHocGhiDanh;

  return (
    <div>
      <Dropdown
        overlay={
          <div className="max-h-[600px] overflow-y-auto bg-white rounded-lg p-2 ">
            {courseArr &&
              courseArr.map((course, index) => (
                <CardItem
                  key={index}
                  course={course}
                  stypeCard={4}
                  detailUser={detailUser}
                  isShopPage={true}
                  user={user}
                />
              ))}
          </div>
        }
        trigger={["click"]}
        className="w-10 h-10"
      >
        <ShoppingCartOutlined className="text-3xl text-color4" />
      </Dropdown>
    </div>
  );
}
