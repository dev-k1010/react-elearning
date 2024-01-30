import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Category() {
  const categoryArr = useSelector((state) => state.dataSlice.categoryCourse);

  const items = categoryArr.map((category, index) => ({
    label: (
      <span key={index} className="font-thin">
        <NavLink to={`/category/${category.maDanhMuc}`}>
          {category.maDanhMuc}
        </NavLink>
      </span>
    ),
    key: index.toString(),
  }));
  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <Space>
        Categories
        <UnorderedListOutlined />
      </Space>
    </Dropdown>
  );
}
