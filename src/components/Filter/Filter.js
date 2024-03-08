import React, { useEffect, useState } from "react";
import { Space, Pagination, Dropdown, Menu } from "antd";
import { BarsOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import CardItem from "../Card/CardItem";
import { useSelector } from "react-redux";

export default function Filter({ courseArr, filter, sortBy }) {
  const user = useSelector((state) => state.userSlice.user);
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  // Array khóa học
  const [currentCoursesArr, setCurrentCoursesArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [hoveredItem, setHoveredItem] = useState(null);
  // Phân trang
  const pageSize = 10;
  const totalCourses = currentCoursesArr.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // Check null "Đệ quy"
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
  console.log("🙂 ~ courseVaidArr ~ courseVaidArr:", courseVaidArr)
  useEffect(() => {
    const filterState = sessionStorage.getItem("filterState");
    if (filterState) {
      const filterArr = JSON.parse(filterState);
      const checkFilter = filterArr.filter((course) => {
        return check(course);
      });
      setCurrentCoursesArr(checkFilter);
    } else {
      setCurrentCoursesArr(courseVaidArr);
    }
  }, [courseArr]);
  // Lọc khóa học theo danh mục
  const handleDropDown = (item) => {
    const filterMap = {
      1: (course) => true,
      2: (course) =>
        ["FrontEnd", "BackEnd", "FullStack"].includes(
          course.danhMucKhoaHoc.maDanhMucKhoahoc
        ),
      "2-1": (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === "FrontEnd",
      "2-2": (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === "BackEnd",
      "2-3": (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === "FullStack",
      3: (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === "DiDong",
      4: (course) =>
        ["TuDuy", "Design"].includes(course.danhMucKhoaHoc.maDanhMucKhoahoc),
      "4-1": (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === "TuDuy",
      "4-2": (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc === "Design",
    };
    // const checkArrDropDown = courseArr.filter((course) => {
    //   return check(course);
    // });
    const filteredList = courseVaidArr.filter(filterMap[item]);
    setCurrentCoursesArr(filteredList);
    setCurrentPage(1);
    sessionStorage.setItem("filterState", JSON.stringify(filteredList));
  };
  // Sắp xếp theo lượt xem
  const handleSortBy = (item) => {
    sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
    const sortedCourses = [...currentCoursesArr].sort((a, b) => {
      if (item.key === "1") {
        return sortOrder === "desc"
          ? a.luotXem - b.luotXem
          : b.luotXem - a.luotXem;
      } else {
        return 0;
      }
    });

    setCurrentCoursesArr(sortedCourses);
    setCurrentPage(1);

    // Lưu trạng thái filter vào sessionStorage
    sessionStorage.setItem("filterState", JSON.stringify(sortedCourses));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderFilterMenu = () => (
    <Menu>
      {filter.map((item) => (
        <Menu.Item
          key={item.key}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
          className="text-xs"
        >
          <span onClick={() => handleDropDown(item.key)}>{item.label}</span>
          <span>
            {item.key === hoveredItem && item.children && (
              <Menu
                className="absolute top-0 left-full text-xs"
                // style={{ fontSize: "1vw" }}
              >
                {item.children.map((child) => (
                  <Menu.Item
                    key={child.key}
                    onClick={() => handleDropDown(child.key)}
                  >
                    <span>{child.label}</span>
                  </Menu.Item>
                ))}
              </Menu>
            )}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );
  const renderSortByMenu = () => (
    <Menu>
      {sortBy.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={() => handleSortBy(item)}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
          className="text-xs"
        >
          <span className="mr-2">{item.label}</span>
          <span>
            {item.key === "1" &&
              (sortOrder === "desc" ? (
                <UpOutlined style={{ fontSize: "0.8vw" }} />
              ) : (
                <DownOutlined style={{ fontSize: "0.8vw" }} />
              ))}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );
  const renderDropdown = (menu, label) => (
    <Dropdown
      arrow
      className="cursor-pointer border border-color3"
      trigger={["click"]}
      overlay={menu}
    >
      <span
        style={{ fontSize: "1.25vw" }}
        className="p-2 flex items-center justify-start text-xs"
      >
        <Space>
          <span className=" font-bold">{label}</span>
          <BarsOutlined />
        </Space>
      </span>
    </Dropdown>
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 space-y-5 md:space-y-0">
      <div className=" col-span-2 lg:col-span-1 flex md:space-x-4">
        <div>{renderDropdown(renderFilterMenu(), "Filter")}</div>
        <div>{renderDropdown(renderSortByMenu(), "Sort by")}</div>
      </div>
      <div className="flex flex-col justify-center items-center col-span-5 lg:col-span-5 space-y-10">
        <div className="grid grid-cols-1 space-y-1">
          {currentCoursesArr
            .slice(startIndex, endIndex)
            .map((course, index) => {
              return (
                <CardItem
                  course={course}
                  stypeCard={2}
                  isBestSeller={false}
                  key={index}
                  isHomePage={true}
                  detailUser={detailUser}
                  user={user}
                />
              );
            })}
        </div>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalCourses}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
/// Fillter version check course null
