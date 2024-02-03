import React from "react";
import CardItem from "../../../components/Card/CardItem";
import { useSelector } from "react-redux";

export default function CourseHot() {
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  const user = useSelector((state) => state.userSlice.user);
  return (
    <div>
      <div>
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
