import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Slider from "react-slick"; // Đảm bảo đã import Slider từ react-slick
import CardItem from "../../../components/Card/CardItem";


export default function ListCourse() {
  const [courseArr, setCourseArr] = useState([]);
  const labelStyle = { fontSize: "1vw" };
  const settings = {
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 4,
    slidesToScroll: 1,
    slidesPerRow: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2000,
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
  const items = [
    { key: "1", label: "Most popular", tab: "1" },
    { key: "2", label: "New", tab: "2" },
    { key: "3", label: "Trend", tab: "1" },
  ];
  
  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    https("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP09")
      .then((res) => {
        setCourseArr(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="pt-14 mx-28">
      <Tabs defaultActiveKey="1" onChange={onChange} className="m-0">
        {items.map((item) => (
          <TabPane
            key={item.key}
            tab={
              <span
                style={labelStyle}
                className="transition duration-300 text-black"
              >
                {item.label}
              </span>
            }
          >
            <Slider {...settings}>
              {item.tab === "1"
                ? courseArr.slice(0, 8).map((course, index) => (
                    <div className="py-7 px-2" key={course.maKhoaHoc}>
                      <CardItem
                        course={course}
                        stypeCard={true}
                        isBestSeller={true}
                      />
                    </div>
                  ))
                : ""}
              {item.tab === "2"
                ? courseArr.slice(9, 16).map((course, index) => (
                    <div className="py-7 px-2" key={index}>
                      <CardItem
                        course={course}
                        stypeCard={true}
                        isBestSeller={false}
                      />
                    </div>
                  ))
                : ""}
            </Slider>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
