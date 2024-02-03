import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  callCourseByCategory,
  callListCourse,
} from "../../redux/User/action/callApi";
import CardItem from "../../components/Card/CardItem";

export default function SearchPage() {
  const { searchName } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  const courseByCategory = useSelector(
    (state) => state.dataSlice.courseByCategory
  );
  const listCourse = useSelector((state) => state.dataSlice.listCourseArr);
  const nameCourse = listCourse.map((item) => item.tenKhoaHoc);
  const isNameInCourse = nameCourse.includes(searchName);

  useEffect(() => {
    dispatch(callCourseByCategory(searchName, user && user.maNhom));
    dispatch(callListCourse(user && user.maNhom));
  }, [dispatch, searchName, user]);

  return (
    <div className="pb-10 md:p-10">
      <h2 className="bg-gradient-to-b mb-3 from-color3/90 to-color2 p-5 text-color4 text-lg font-medium ">
        Search results ({isNameInCourse ? 1 : courseByCategory.length} course)
      </h2>
      <div className="md:mx-20">
        {isNameInCourse ? (
          <div>
            {listCourse.map((course) => {
              if (course.tenKhoaHoc === searchName) {
                return (
                  <CardItem
                    course={course}
                    stypeCard={2}
                    isSearchPage={true}
                    detailUser={detailUser}
                    user={user}
                  />
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div>
            {courseByCategory.map((course) => {
              return (
                <CardItem
                  course={course}
                  stypeCard={2}
                  isSearchPage={true}
                  detailUser={detailUser}
                  user={user}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
