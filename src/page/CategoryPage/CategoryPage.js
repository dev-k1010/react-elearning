import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import CardItem from "../../components/Card/CardItem";
import { BarsOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Pagination, Space } from "antd";
import { useSelector } from "react-redux";

export default function CategoryPage() {
  const user = useSelector((state) => state.userSlice.user);
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  const { idCourse } = useParams();
  const [courseArr, setCourseArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    https(
      `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${idCourse}&MaNhom=GP09`
    )
      .then((res) => {
        setCourseArr(res.data);
      })
      .catch((err) => {
        console.log("🙂 ~ useEffect ~ err:", err);
      });
    window.scrollTo(0, 0);
  }, [idCourse]);

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
  const pageSize = 5;
  const totalCourses = courseVaidArr.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCourses = courseVaidArr.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortBy = [
    {
      key: "1",
      label: "Views",
    },
    {
      key: "2",
      label: "Day update",
    },
  ];

  const handleSortBy = (item) => {
    sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
    const sortedCourses = [...courseVaidArr].sort((a, b) => {
      if (item.key === "1") {
        return sortOrder === "desc"
          ? a.luotXem - b.luotXem
          : b.luotXem - a.luotXem;
      } else if (item.key === "2") {
        const dateA = new Date(a.ngayTao.split("/").reverse().join("/"));
        const dateB = new Date(b.ngayTao.split("/").reverse().join("/"));
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        return 0;
      }
    });

    setCourseArr(sortedCourses);
    setCurrentPage(1);
  };

  const renderSortIcon = (item) => {
    if (item.key === "1") {
      return sortOrder === "desc" ? (
        <UpOutlined style={{ fontSize: "0.8vw" }} />
      ) : (
        <DownOutlined style={{ fontSize: "0.8vw" }} />
      );
    }
    if (item.key === "2") {
      return sortOrder === "desc" ? (
        <UpOutlined style={{ fontSize: "0.8vw" }} />
      ) : (
        <DownOutlined style={{ fontSize: "0.8vw" }} />
      );
    }
    return null;
  };

  const renderSortByMenu = () => (
    <Menu>
      {sortBy.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={() => handleSortBy(item)}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span className="mr-2">{item.label}</span>
          <span>{renderSortIcon(item)}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const renderDropdown = (menu, label) => (
    <Dropdown
      className="cursor-pointer border border-color3"
      trigger={["click"]}
      overlay={menu}
    >
      <span
        className={`p-2 flex items-center justify-start ${
          hoveredItem ? "border-color3" : ""
        }`}
      >
        <Space>
          <span className=" font-bold">{label}</span>
          <BarsOutlined />
        </Space>
      </span>
    </Dropdown>
  );

  return (
    <div className="flex flex-col space-y-3 pb-10 lg:p-10">
      <h2 className="bg-gradient-to-b from-color3/90 to-color2 p-5 text-color4 text-lg font-medium">
        {courseArr.length > 0 && (
          <h2>
            {courseArr[0].danhMucKhoaHoc.maDanhMucKhoahoc} ({courseVaidArr.length}{" "}
            course)
          </h2>
        )}
      </h2>
      <div className=" grid grid-cols-6 space-y-5 mx-2 md:px-5 lg:px-10 md:space-x-5">
        <div className="col-span-2 md:col-span-1">
          {renderDropdown(renderSortByMenu(), "Sort by")}
        </div>
        <div className="col-span-6 md:col-span-5 flex flex-col justify-center items-center space-y-10 ">
          <div>
            {currentCourses.map((course, index) => (
              <CardItem
                course={course}
                stypeCard={2}
                isBestSeller={false}
                key={index}
                isCategoryPage={true}
                deleteCourse={false}
                user={user}
                detailUser={detailUser}
              />
            ))}
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
    </div>
  );
}
