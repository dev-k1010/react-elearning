import { Button, Card, Modal, Rate, Space } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingCartOutlined,
  YoutubeOutlined,
  UploadOutlined,
  LockOutlined,
  TeamOutlined,
  SoundOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  cancelCourse,
  infoDetailUser,
  signUpCourse,
} from "../../redux/User/action/callApi";

export default function CardItem({
  course,
  stypeCard,
  isBestSeller,
  isHomePage,
  isCategoryPage,
  isSearchPage,
  isAccontPage,
  isDetailpage,
  detailUser,
  user,
}) {
  const dispatch = useDispatch();
  const handleBuyNow = (maKhoaHoc) => {
    if (
      detailUser &&
      detailUser.chiTietKhoaHocGhiDanh.find(
        (user) => user.maKhoaHoc === maKhoaHoc
      )
    ) {
      Modal.error({
        title: "Registered Course",
        content: (
          <div>
            <p>Please choose another course!</p>
          </div>
        ),
        okButtonProps: {
          className: "bg-red-500 text-white",
        },
      });
    } else {
      dispatch(signUpCourse(maKhoaHoc, detailUser.taiKhoan));
      Modal.success({
        title: "Successfully Registered",
        content: (
          <div>
            <p>Let's start learning right away!</p>
          </div>
        ),
        okButtonProps: {
          className: "bg-color3 text-white",
        },
      });
    }
  };
  const handleCancelCourse = (maKhoaHoc) => {
    dispatch(cancelCourse(maKhoaHoc, detailUser.taiKhoan));
    window.location.reload();
  };
  return (
    <>
      {stypeCard == 1 && (
        <div className="py-7 mx-2 ">
          <Card
            className="group border-0 shadow-lg shadow-black/30 hover:shadow-black/80  bg-gradient-to-b from-color3/90 to-color2 transition duration-500 ease-in-out transform hover:scale-100 text-white font-sans w-full overflow-visible"
            key={course.maKhoaHoc}
            hoverable
          >
            <div className="flex flex-col justify-center items-center space-y-2 ">
              <img
                className="drop-shadow-md group-hover:drop-shadow-2xl transition duration-500  ease-in-out group-hover:scale-x-105 transform group-hover:-translate-y-3 h-[18vh] w-full -mt-2 px-4"
                alt="example"
                src={course.hinhAnh}
                loading="lazy"
              />
              <span className="bg-color3 shadow-md shadow-color3/80 text-center font-medium transform transition duration-700 group-hover:-translate-y-3 group-hover:scale-x-105 group-hover:shadow-lg p-2 w-full whitespace-nowrap truncate ">
                {course.tenKhoaHoc}
              </span>
              <div className="space-y-2">
                <NavLink
                  style={{ fontSize: "1vw" }}
                  className="flex justify-center text-center p-2 w-32 backdrop-blur-sm shadow-color3/80 shadow-sm bg-color1/10  border-color3/50 rounded-md transform transition duration-500 group-hover:-translate-y-3 group-hover:scale-x-100 group-hover:shadow-lg  hover:text-white whitespace-normal text-sm"
                >
                  <span className="line-clamp-1 md:line-clamp-2">
                    {course.danhMucKhoaHoc.maDanhMucKhoahoc}
                  </span>
                </NavLink>
                <NavLink
                  onClick={() => handleBuyNow(course.maKhoaHoc)}
                  to={!user ? "/login" : ""}
                  style={{ fontSize: "2.5vh" }}
                  className="p-2 backdrop-blur-sm bg-color4 shadow-color3/80 shadow-sm border-color3/90 drop-shadow-xl group-hover:shadow-lg rounded-md transform transition duration-500 group-hover:-translate-y-3 group-hover:scale-x-105 hover:text-color3 flex justify-center items-center text-center w-32 text-xs lg:text-lg lg:p-2"
                >
                  <Space>
                    <ShoppingCartOutlined />
                    Buy Now
                  </Space>
                </NavLink>
              </div>
            </div>
            <div className="w-full h-32 overflow-hidden ">
              {/* ẩn ở màn hình Mobile */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-center transition ease-in-out duration-700 group-hover:hidden mt-6 ">
                  <Space>
                    <Rate
                      style={{ fontSize: "1.25vw" }}
                      className=" text-color4 "
                      allowHalf
                      defaultValue={4.5}
                      disabled
                    />
                    <span style={{ fontSize: "0.75vw" }} className="mt-2">
                      ({course.luotXem} View){" "}
                    </span>
                  </Space>
                </div>
                <div className="flex flex-col transition ease-in-out duration-500 translate-y-48 group-hover:translate-y-1 px-2">
                  <h2
                    style={{ fontSize: "0.9vw" }}
                    className="text-left line-clamp-4 text-ellipsis overflow-hidden m-2 mt-0"
                  >
                    {course.moTa}
                  </h2>
                  <NavLink
                    to={`/detail/${course.maKhoaHoc}`}
                    style={{ fontSize: 15 }}
                    className="ml-2 text-color4 hover:text-color5"
                  >
                    View details {">"}
                  </NavLink>
                </div>
              </div>
              <div className="flex flex-col p-2">
                <h2 className="text-left line-clamp-4 text-ellipsis m-2 mt-0 text-xs">
                  {course.moTa}
                </h2>
                <NavLink
                  to={`/detail/${course.maKhoaHoc}`}
                  style={{ fontSize: 10 }}
                  className="ml-2 text-color4 hover:text-color5"
                >
                  View details {">"}
                </NavLink>
              </div>
              {isBestSeller && (
                <h2 className="backdrop-blur-sm bg-red-600 rounded-l-sm p-1 md:py-1 md:px-2 -right-1 bottom-5 absolute skew-x-3 shadow-lg shadow-color3/80 transition ease-in-out duration-500 translate-y-0 group-hover:translate-y-2">
                  Best seller
                </h2>
              )}
            </div>
          </Card>
        </div>
      )}

      {stypeCard == 2 && (
        <Card key={course.maKhoaHoc} className="mb-2">
          <div className="grid grid-cols-4 p-2 space-x-2 md:space-x-4 ">
            <div className="col-span-1 flex justify-center items-center">
              <img
                src={course.hinhAnh}
                className="h-[22vh] w-full"
                loading="lazy"
              />
            </div>
            <div className="col-span-3 grid grid-cols-1 ">
              <span className="font-bold">{course.tenKhoaHoc}</span>
              <span>
                <p
                  style={{ fontSize: "1vw" }}
                  className="line-clamp-3  overflow-hidden text-xs"
                >
                  {course.moTa}
                </p>
              </span>
              <div className="flex justify-between items-center pt-1">
                <div className="hidden md:block">
                  <Space style={{ fontSize: "1vw" }}>
                    <Rate
                      style={{ fontSize: "1.5vw" }}
                      className=" text-color4 "
                      allowHalf
                      defaultValue={4.5}
                      disabled
                    />
                    <span className="mt-2">({course.luotXem} View)</span>
                  </Space>
                </div>

                {isAccontPage && (
                  <>
                    <span>{course.ngayTao}</span>
                    <Button
                      onClick={() => handleCancelCourse(course.maKhoaHoc)}
                      style={{ fontSize: 12 }}
                      className=" text-color4 hover:text-color5 hover:border-color5"
                    >
                      Delete <DeleteOutlined />
                    </Button>
                  </>
                )}
                {(isCategoryPage || isSearchPage) && (
                  <>
                    <span>{course.ngayTao}</span>
                    <div className="space-x-3">
                      <NavLink
                        onClick={() => handleBuyNow(course.maKhoaHoc)}
                        to={!user ? "/login" : ""}
                        style={{ fontSize: 12 }}
                        className=" text-color4 hover:text-color5"
                      >
                        Buy Now <ShoppingCartOutlined />
                      </NavLink>
                      <NavLink
                        to={`/detail/${course.maKhoaHoc}`}
                        style={{ fontSize: 12 }}
                        className=" text-color3 hover:text-color2"
                      >
                        View detail {">"}
                      </NavLink>
                    </div>
                  </>
                )}
                {isHomePage && (
                  <>
                    <span
                      style={{ fontSize: "1vw" }}
                      className="hidden md:block"
                    >
                      {course.danhMucKhoaHoc.maDanhMucKhoahoc}
                    </span>
                    <div className="space-x-3 ">
                      <NavLink
                        onClick={() => handleBuyNow(course.maKhoaHoc)}
                        to={!user ? "/login" : ""}
                        style={{ fontSize: 12 }}
                        className=" text-color4 hover:text-color5"
                      >
                        Buy Now <ShoppingCartOutlined />
                      </NavLink>
                      <NavLink
                        to={`/detail/${course.maKhoaHoc}`}
                        style={{ fontSize: 12 }}
                        className=" text-color3 hover:text-color2"
                      >
                        View detail {">"}
                      </NavLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
      {/* Card hot */}
      {stypeCard == 3 && (
        <Card
          key={course.maKhoaHoc}
          className="overflow-x-auto w-full bg-gradient-to-b from-color4/40 to-color2 flex flex-col  items-end shadow-lg shadow-black/70 mt-3  space-y-1 p-2 "
        >
          <img src={course.hinhAnh} loading="lazy" className="" />

          <h2 className="text-center font-bold">{course.tenKhoaHoc}</h2>
          <span className="flex justify-center" style={{ fontSize: "1vw" }}>
            {course.danhMucKhoaHoc.maDanhMucKhoahoc}
          </span>
          <div className="flex flex-col space-y-1 mb-2 ">
            <span className="mb-2">
              <Space>
                <SoundOutlined className="text-md" />
                <span className="font-medium">
                  The hottest courses at the moment
                </span>
              </Space>
            </span>
            <span>
              <Space>
                <YoutubeOutlined className="text-md" />
                {course.luotXem}
              </Space>
            </span>
            <span>
              <Space>
                <UploadOutlined className="text-md" />
                {course.ngayTao}
              </Space>
            </span>
            <span>
              <Space>
                <LockOutlined className="text-md" />
                {course.maKhoaHoc}
              </Space>
            </span>
            <span>
              <Space>
                <TeamOutlined className="text-md" />
                {course.maNhom}
              </Space>
            </span>
          </div>
          <NavLink
            onClick={() => handleBuyNow(course.maKhoaHoc)}
            style={{ fontSize: "2.5vh" }}
            className="w-full h-full backdrop-blur-sm bg-color4 shadow-color3/80 shadow-sm border-color3/90 drop-shadow-xl hover:shadow-lg rounded-md transform transition duration-500 hover:scale-x-105 hover:text-color3 flex items-center text-center justify-center py-2 "
          >
            <Space>
              <ShoppingCartOutlined />
              Buy Now
            </Space>
          </NavLink>
        </Card>
      )}
      {isDetailpage && (
        <>
          <div
            style={{
              backgroundImage: `url(${course.hinhAnh})`,
            }}
            className="bg-cover bg-center relative w-full h-96 flex justify-center items-center "
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-black/50 "></div>
            <div className="absolute w-full grid grid-cols-5 text-white space-x-5 md:space-x-0">
              <div className="col-span-3 space-y-10 pl-5">
                <p className="text-6xl">{course.tenKhoaHoc}</p>
                <div className="space-y-3">
                  <h2 className=" space-x-5 hidden lg:block ">
                    <Space>
                      <p>Review course: </p>
                      <Rate
                        style={{ fontSize: "1.25vw" }}
                        className=" text-color4 "
                        allowHalf
                        defaultValue={4.5}
                        disabled
                      />
                      <span style={{ fontSize: "1vw" }} className="mt-2">
                        ({course.luotXem} View){" "}
                      </span>
                    </Space>
                  </h2>
                  <NavLink
                    onClick={() => handleBuyNow(course.maKhoaHoc)}
                    to={!user ? "/login" : ""}
                    style={{ fontSize: "2.5vh" }}
                    className="p-2 backdrop-blur-sm bg-color4 shadow-color3/80 shadow-sm border-color3/90 drop-shadow-xl group-hover:shadow-lg rounded-full  transform transition duration-500 group-hover:-translate-y-3 group-hover:scale-x-105 hover:text-color3 flex justify-center items-center text-center w-32 md:w-44 lg:w-32"
                  >
                    <Space>
                      <ShoppingCartOutlined />
                      Buy Now
                    </Space>
                  </NavLink>
                </div>
              </div>
              <div className=" flex items-end justify-center col-span-2 ">
                <img
                  src={course.hinhAnh}
                  alt=""
                  className="w-52 shadow-lg shadow-black/50"
                />
              </div>
            </div>
          </div>
          {isHomePage ? (
            <></>
          ) : (
            <div className="p-10">
              <h2 className="py-4 text-3xl">Course description</h2>
              <Space>
                <Rate
                  className=" text-color4 "
                  allowHalf
                  defaultValue={4.5}
                  disabled
                />
                <span className="mt-2">({course.luotXem} View) </span>
              </Space>
              <p>{course.moTa}</p>
              <p className="text-end">{course.ngayTao}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
