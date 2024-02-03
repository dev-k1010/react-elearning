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
      <div>
        <CourseHot />
      </div>

      <div className="lg:hidden">
        <TabsAntd />
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-5">
          <div className="col-span-4">
            <TabsAntd />
          </div>
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

      <div>
        <Slider {...settings}>
          {courseArr.map((course, index) => (
            <div className="py-7" key={index}>
              <img src={course.hinhAnh} className=" h-[25vh] w-full" />
            </div>
          ))}
        </Slider>
      </div>

      <div className="px-2 lg:px-10">
        <FilterCourse />
      </div>
    </div>
  );
}
