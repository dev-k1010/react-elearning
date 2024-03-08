import React from "react";
import Filter from "../../../components/Filter/Filter";
import { useSelector } from "react-redux";

export default function FilterCourse() {
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  
  const filter = [
    {
      key: "1",
      label: "All Course",
    },
    {
      key: "2",
      label: "Wep Development",
      children: [
        {
          key: "2-1",
          label: "Front-End",
        },
        {
          key: "2-2",
          label: "Back-End",
        },
        {
          key: "2-3",
          label: "FullStack",
        },
      ],
    },
    {
      key: "3",
      label: "Mobile App",
    },
    {
      key: "4",
      label: "Other Courses",
      children: [
        {
          key: "4-1",
          label: "Programming Logic",
        },
        {
          key: "4-2",
          label: "Design",
        },
      ],
    },
  ];
  const sortBy = [
    {
      key: "1",
      label: "Views",
    },
  ];
  return <Filter courseArr={courseArr} filter={filter} sortBy={sortBy} />;
}
