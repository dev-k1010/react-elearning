import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import CardItem from "../../components/Card/CardItem";
import { BarsOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Pagination, Space } from "antd";
import Slider from "react-slick";

export default function CategoryPage() {
  const { idCourse } = useParams();
  const [courseArr, setCourseArr] = useState([]);
  console.log("🙂 ~ CategoryPage ~ courseArr:", courseArr);
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

  const pageSize = 5;
  const totalCourses = courseArr.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCourses = courseArr.slice(startIndex, endIndex);

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
    const sortedCourses = [...courseArr].sort((a, b) => {
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
          style={{ fontSize: "1vw" }}
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
        style={{ fontSize: "1.25vw" }}
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
    <div className="pt-20 flex flex-col space-y-3">
      <h2 className="bg-gradient-to-b from-color3/90 to-color2 p-5 text-color4 text-lg font-medium">
        {courseArr.length > 0 && (
          <h2>
            {courseArr[0].danhMucKhoaHoc.maDanhMucKhoahoc} ({courseArr.length}{" "}
            course)
          </h2>
        )}
      </h2>
      <div className="px-10 w-screen grid grid-cols-6 space-x-5">
        <div className="col-span-1">
          {renderDropdown(renderSortByMenu(), "Sort by")}
        </div>
        <div className="col-span-5 flex flex-col justify-center items-center space-y-10 ">
          <div>
            {currentCourses.map((course, index) => (
              <CardItem
                course={course}
                stypeCard={2}
                isBestSeller={false}
                key={index}
                isCategoryPage={true}
                deleteCourse={false}
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
