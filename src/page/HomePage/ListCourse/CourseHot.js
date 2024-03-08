import React from "react";
import CardItem from "../../../components/Card/CardItem";
import { useSelector } from "react-redux";

export default function CourseHot() {
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  const user = useSelector((state) => state.userSlice.user);
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
  return (
    <div>
      <div>
        {courseVaidArr
          .slice() // Tạo một bản sao của mảng để tránh thay đổi mảng gốc
          .sort(
            (a, b) =>
              b.luotXem - a.luotXem ||
              courseVaidArr.indexOf(a) - courseVaidArr.indexOf(b)
          )
          .slice(0, 1)
          .map((course, index) => {
            return (
              <>
                <div>
                  <CardItem
                    key={course.maKhoaHoc}
                    course={course}
                    isDetailpage={true}
                    user={user}
                    detailUser={detailUser}
                    isHomePage={true}
                  />
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
{
  /**/
}
