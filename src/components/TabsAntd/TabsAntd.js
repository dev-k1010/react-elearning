import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import CardItem from "../Card/CardItem";
import Slider from "react-slick";
import { useSelector } from "react-redux";

export default function TabsAntd() {
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const user = useSelector((state) => state.userSlice.user);
  const listUserCourse = useSelector((state) => state.userSlice.infoUserCourse);
  const settings = {
    className: "center",
    infinite: true,
    centerMode: true,
    centerPadding: "2px",
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 300,
    rows: 1,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const listTabs = [
    { key: "1", label: "Most popular", tab: "1" },
    { key: "2", label: "New", tab: "2" },
    { key: "3", label: "Trend", tab: "3" },
  ];
  const renderCourse = (courses, stypeCard, isBestSeller) => {
    return courses.map((course, index) => (
      <CardItem
        course={course}
        stypeCard={stypeCard}
        isBestSeller={isBestSeller}
        isCategoryPage={false}
        user={user}
        listUserCourse={listUserCourse}
      />
    ));
  };
  const filterCourses = (courseArr, condition) => {
    return courseArr.filter((course) =>
      condition.includes(course.danhMucKhoaHoc.maDanhMucKhoahoc)
    );
  };
  const renderTab = (key, courseArr) => {
    return key === "1" ? (
      renderCourse(
        courseArr
          .slice()
          .sort((a, b) => b.luotXem - a.luotXem)
          .slice(0, 8),
        1,
        true
      )
    ) : key === "2" ? (
      renderCourse(filterCourses(courseArr, ["TuDuy", "DiDong"]), 1, false)
    ) : key === "3" ? (
      renderCourse(
        filterCourses(courseArr, ["FrontEnd", "BackEnd", "FullStack"]),
        1,
        false
      )
    ) : (
      <></>
    );
  };

  //
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs
      defaultActiveKey="0"
      destroyInactiveTabPane={true}
      onChange={onChange}
      className="px-10"
    >
      {listTabs.map((item, index) => (
        <TabPane
          key={index}
          tab={
            <span style={{ fontSize: "1vw" }} className=" text-black">
              {item.label}
            </span>
          }
        >
          <Slider {...settings}>{renderTab(item.key, courseArr)}</Slider>
        </TabPane>
      ))}
    </Tabs>
  );
}
