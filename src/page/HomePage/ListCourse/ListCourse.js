import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { Card, Rate, Space, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { NavLink } from "react-router-dom";
import moment from "moment";
export default function ListCourse() {
  const [courseArr, setCourseArr] = useState([]);

  console.log("🙂 ~ ListCourse ~ courseArr:", courseArr);
  useEffect(() => {
    https("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP09")
      .then((res) => {
        setCourseArr(res.data);
      })
      .catch((err) => { });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mx-5 ">
      {courseArr.map((course) => {
        return (
          <Card
            className="group shadow-lg shadow-color3/50 w-full bg-gradient-to-t from-color2 to-color3  transition duration-500 ease-in-out transform hover:scale-105 text-white font-sans "
            key={course.maKhoaHoc}
            hoverable
          >

            <div className="flex flex-col justify-center items-center space-y-4">

              <img
                className="drop-shadow-none group-hover:drop-shadow-2xl transition duration-500 ease-in-out transform group-hover:-translate-y-6 h-[30vh] p-4"
                alt="example"
                src={course.hinhAnh}
              />

              <h2 className="bg-color2 shadow-lg shadow-color1/50 text-center text-base font-medium border-b transform transition duration-700 group-hover:-translate-y-6 group-hover:scale-x-105 py-2 w-full">
                {course.tenKhoaHoc}
              </h2>

              <div className="flex justify-center items-center space-x-2 p-2">


                <h3 className="backdrop-blur-sm bg-color2/20 drop-shadow-xl shadow-md text-sm text-center rounded-md py-1 px-2 transform transition duration-700 group-hover:-translate-y-6 group-hover:scale-x-105">{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h3>


                <NavLink style={{ fontSize: 12 }} className=" border-2 border-red-500 px-8 py-1 text-color4 hover:text-color3 transform transition duration-700 group-hover:-translate-y-6 group-hover:scale-x-105">Apply</NavLink>

              </div>


            </div>

            <div className="overflow-hidden w-full h-32 mb-2">

              <div className="flex items-center p-6 overflow-hidden  transition ease-in-out group-hover:hidden">

                <Space style={{ fontSize: 12 }}>
                  <Rate className=" text-color4" allowHalf defaultValue={4.5} />
                  <span className="mt-2 text-black">({course.luotXem})</span>
                </Space>

              </div>

              <div className="overflow-hidden flex flex-col transition ease-in-out duration-500 translate-y-52  group-hover:translate-y-0 w-full h-32">

                <h2 style={{ fontSize: 12 }} className="m-2 text-left line-clamp-4 text-ellipsis ">{course.moTa}</h2>

                <NavLink style={{ fontSize: 12 }} className="m-2  text-color4 hover:text-color3">Real more</NavLink>
              </div>
            </div>

            {/*  */}
          </Card>

        );
      })}
    </div >
  );
}