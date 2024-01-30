import React, { useEffect, useState } from "react";
import CardItem from "../../../components/Card/CardItem";
import { useSelector } from "react-redux";

export default function CourseHot() {
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);


  return (
    <div>
      {courseArr
        .slice() // Tạo một bản sao của mảng để tránh thay đổi mảng gốc
        .sort(
          (a, b) =>
            b.luotXem - a.luotXem || courseArr.indexOf(a) - courseArr.indexOf(b)
        )
        .slice(0, 1)
        .map((course, index) => {
          return <CardItem key={index} course={course} stypeCard={3} />;
        })}
    </div>
  );
}
