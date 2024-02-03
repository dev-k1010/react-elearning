import React, { useState } from "react";
import { Dropdown, Menu, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UnorderedListOutlined } from "@ant-design/icons";

export default function Category() {
  const categoryArr = useSelector((state) => state.dataSlice.categoryCourse);
  const [collapsed, setCollapsed] = useState(false);
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
  const itemsMobile = [
    {
      key: "0",
      label: <span> Categories </span>,
      children: categoryArr.map((category, index) => ({
        label: (
          <span key={index} className="font-thin">
            <NavLink to={`/category/${category.maDanhMuc}`}>
              {category.maDanhMuc}
            </NavLink>
          </span>
        ),
        key: index.toString(),
      })),
    },
  ];

  return (
    <div className="w-full">
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={itemsMobile}
        className="lg:hidden block"
      />
      <div className="hidden lg:block">
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
      </div>
    </div>
  );
}
