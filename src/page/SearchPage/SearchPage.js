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
  let user = useSelector((state) => state.userSlice.user);
  const courseByCategory = useSelector(
    (state) => state.dataSlice.courseByCategory
  );
  const listCourse = useSelector((state) => state.dataSlice.listCourseArr);
  const nameCourse = listCourse.map((item) => item.tenKhoaHoc);
  const isNameInCourse = nameCourse.includes(searchName);

  useEffect(() => {
    dispatch(callCourseByCategory(searchName, user.maNhom));
    dispatch(callListCourse(user.maNhom));
  }, [dispatch, searchName, user]);

  return (
    <div className="pt-24 mx-20">
      <h2 className="bg-gradient-to-b mb-3 from-color3/90 to-color2 p-5 text-color4 text-lg font-medium ">
        Search results ({isNameInCourse ? 1 : courseByCategory.length} course)
      </h2>
      {isNameInCourse ? (
        <div>
          {listCourse.map((item) => {
            if (item.tenKhoaHoc === searchName) {
              return (
                <CardItem
                  course={item}
                  stypeCard={2}
                  isBestSeller={false}
                  isCategoryPage={true}
                />
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div>
          {courseByCategory.map((item) => {
            return (
              <CardItem
                course={item}
                stypeCard={2}
                isBestSeller={false}
                isCategoryPage={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
