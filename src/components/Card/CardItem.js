import { Card, Rate, Space } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

export default function CardItem({ course, stypeCard, isBestSeller }) {
  return stypeCard ? (
    <Card
      className="group border-0 relative shadow-lg shadow-black/30 hover:shadow-black/80  bg-gradient-to-b from-color3/90 to-color2 transition duration-500 ease-in-out transform hover:scale-105 text-white font-sans w-full"
      key={course.maKhoaHoc}
      hoverable
    >
      <div className="flex flex-col justify-center items-center space-y-2 ">
        <img
          className="drop-shadow-md group-hover:drop-shadow-2xl transition duration-500  ease-in-out group-hover:scale-x-10 transform group-hover:-translate-y-2 h-[22vh] w-full -mt-2 px-4"
          alt="example"
          src={course.hinhAnh}
        />
        <span className="bg-color3 shadow-md shadow-color3/80 text-center font-medium transform transition duration-700 group-hover:-translate-y-2 group-hover:scale-x-105 group-hover:shadow-lg p-2 w-full whitespace-nowrap truncate ">
          {course.tenKhoaHoc}
        </span>
        <div className="grid grid-cols-2 gap-2 justify-center items-center px-4 ">
          <NavLink
            style={{ fontSize: "1vw" }}
            className="flex items-center text-center justify-center p-1 w-full h-full backdrop-blur-sm shadow-color3/80 shadow-sm bg-color1/10  border-color3/50 rounded-md transform transition duration-700 group-hover:-translate-y-2 group-hover:scale-x-100 group-hover:shadow-lg  hover:text-color3 whitespace-normal"
          >
            <span className="line-clamp-1 md:line-clamp-2">
              {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </span>
          </NavLink>
          <NavLink
            style={{ fontSize: "2vh" }}
            className="w-full h-full backdrop-blur-sm bg-color4 shadow-color3/80 shadow-sm border-color3/90 drop-shadow-xl group-hover:shadow-lg rounded-md transform transition duration-700 group-hover:-translate-y-2 group-hover:scale-x-105 p-4 hover:text-color3 flex items-center text-center justify-center"
          >
            Apply
          </NavLink>
        </div>
      </div>
      <div className="w-full h-32 overflow-hidden ">
        <div className="flex items-center justify-center transition ease-in-out duration-700 group-hover:hidden mt-8">
          <Space style={{ fontSize: "1vw" }}>
            <Rate className=" text-color4 " allowHalf defaultValue={4.5} />
            <span className="mt-2">( {course.luotXem} )</span>
          </Space>
        </div>
        <div className="flex flex-col transition ease-in-out duration-500 translate-y-52 group-hover:translate-y-0 px-2">
          <h2
            style={{ fontSize: "1vw" }}
            className="text-left line-clamp-3  lg:line-clamp-4 text-ellipsis m-2"
          >
            {course.moTa}
          </h2>
          <NavLink
            style={{ fontSize: 12 }}
            className="ml-2 text-color4 hover:text-color5"
          >
            Real more {">"}
          </NavLink>
        </div>
      </div>
      {isBestSeller && (
        <h2 className="backdrop-blur-sm bg-color4 px-3 rounded-l-sm py-1 -right-1 bottom-5 absolute skew-x-3  shadow-lg shadow-color3/80">
          Best seller
        </h2>
      )}
    </Card>
  ) : (
    <Card>adads</Card>
  );
}
