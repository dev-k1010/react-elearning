import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import CardItem from "../Card/CardItem";
import Slider from "react-slick";
import { useSelector } from "react-redux";

export default function TabsAntd() {
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const user = useSelector((state) => state.userSlice.user);
  const detailUser = useSelector((state) => state.userSlice.detailUser);

  const settings = {
    className: "center",
    infinite: true,
    // centerMode: true,
    centerPadding: "2px",
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 1200,
    rows: 1,
    cssEase: "ease-in-out",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const renderCardItems = (filteredCourses, isBestSeller) => (
    <Slider {...settings}>
      {filteredCourses.map((course, index) => (
        <CardItem
          key={index}
          course={course}
          stypeCard={1}
          isBestSeller={isBestSeller}
          isCategoryPage={false}
          detailUser={detailUser}
          user={user}
        />
      ))}
    </Slider>
  );

  const items = [
    {
      key: "1",
      label: "Most popular",
      children: renderCardItems(
        courseArr
          .slice()
          .sort((a, b) => b.luotXem - a.luotXem)
          .slice(0, 15),
        true
      ),
    },
    {
      key: "2",
      label: "New",
      children: renderCardItems(
        courseArr.filter(
          (course) =>
            course.danhMucKhoaHoc.maDanhMucKhoahoc === `TuDuy` ||
            course.danhMucKhoaHoc.maDanhMucKhoahoc === `DiDong`
        ),
        false
      ),
    },
    {
      key: "3",
      label: "Trend",
      children: renderCardItems(
        courseArr.filter((course) =>
          ["FrontEnd", "BackEnd", "FullStack"].includes(
            course.danhMucKhoaHoc.maDanhMucKhoahoc
          )
        ),
        false
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      destroyInactiveTabPane={true}
      className="px-7 md:px-10"
    >
      {items.map((item) => (
        <TabPane
          tab={
            <span  className=" text-black text-xs">
              {item.label}
            </span>
          }
          key={item.key}
        >
          {item.children}
        </TabPane>
      ))}
    </Tabs>
  );
}
