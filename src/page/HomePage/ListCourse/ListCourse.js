import React, { useEffect } from "react";
import TabsAntd from "../../../components/TabsAntd/TabsAntd";
import Slider from "react-slick";
import FilterCourse from "./FilterCourse";
import { useDispatch, useSelector } from "react-redux";
import { infoDetailUser } from "../../../redux/User/action/callApi";
import CourseHot from "./CourseHot";
import CardItem from "../../../components/Card/CardItem";

export default function ListCourse() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const detailUser = useSelector((state) => state.userSlice.detailUser);

  useEffect(() => {
    if (user) {
      dispatch(infoDetailUser(user.taiKhoan));
    }
    window.scrollTo(0, 0);
  }, [user]);
  const check = (course) => {
    const checkNullValue = (course) => {
      for (const key in course) {
        if (course.hasOwnProperty(key)) {
          const value = course[key];

          // Kiểm tra giá trị của key
          if (value === null) {
            return false;
          }

          // Nếu giá trị là một object hoặc array, thực hiện kiểm tra đệ quy
          if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
              // Nếu giá trị là một array, kiểm tra từng phần tử trong array
              for (let i = 0; i < value.length; i++) {
                if (!checkNullValue(value[i])) {
                  return false; // Nếu có giá trị null, trả về false
                }
              }
            } else {
              // Nếu giá trị là một object, thực hiện kiểm tra đệ quy
              if (!checkNullValue(value)) {
                return false; // Nếu có giá trị null, trả về false
              }
            }
          }
        }
      }
      return true;
    };

    return checkNullValue(course);
  };
  // Lọc khóa học không có key NULL
  const courseVaidArr = courseArr.filter((course) => {
    return check(course);
  });
  const settings = {
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
  };
  return (
    <div className="pb-10 ">
      {/* Banner */}
      <div>
        <CourseHot />
      </div>
      {/* Tabs ở màn hình Mobile */}
      <div className="lg:hidden">
        <TabsAntd />
      </div>
      {/* Tabs ở màn hình Desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5">
          <div className="col-span-4">
            <TabsAntd />
          </div>
          {/* Khóa học có lượt xem cao nhất */}
          <div className="col-span-1 hidden lg:block">
            {courseArr
              .slice() // Tạo một bản sao của mảng để tránh thay đổi mảng gốc
              .sort(
                (a, b) =>
                  b.luotXem - a.luotXem ||
                  courseArr.indexOf(a) - courseArr.indexOf(b)
              )
              .slice(0, 1)
              .map((course, index) => {
                return (
                  <div className="hidden lg:block">
                    <CardItem
                      key={index}
                      course={course}
                      stypeCard={3}
                      detailUser={detailUser}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Slider */}
      <div>
        <Slider {...settings}>
          {courseVaidArr.map((course, index) => (
            <div className="py-7" key={index}>
              <img src={course.hinhAnh} className=" h-[25vh] w-full" />
            </div>
          ))}
        </Slider>
      </div>
      {/* List course  */}
      <div className="px-2 lg:px-10">
        <FilterCourse />
      </div>
    </div>
  );
}
