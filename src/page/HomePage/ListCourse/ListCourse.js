import React, { useEffect } from "react";
import TabsAntd from "../../../components/TabsAntd/TabsAntd";
import Slider from "react-slick";
import FilterCourse from "./FilterCourse";
import { useDispatch, useSelector } from "react-redux";
import { callListCourse } from "../../../redux/User/action/callApi";
import CourseHot from "./CourseHot";

export default function ListCourse() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);

  useEffect(() => {
    dispatch(callListCourse(user.maNhom));
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
    <div className="pt-16">
      <div className=" grid grid-cols-5">
        <div className="col-span-4">
          <TabsAntd />
        </div>
        <div className="col-span-1">
          <CourseHot />
        </div>
      </div>

      <div>
        <Slider {...settings}>
          {courseArr.map((course, index) => (
            <div className="py-7" key={course.maKhoaHoc}>
              <img src={course.hinhAnh} className=" h-[25vh] w-full" />
            </div>
          ))}
        </Slider>
      </div>

      <div className="ml-9 mr-64">
        <FilterCourse />
      </div>
    </div>
  );
}
