import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import unidecode from "unidecode";
import { useSelector } from "react-redux";

const SearchItem = () => {
  const navigate = useNavigate();
  const categoryArr = useSelector((state) => state.dataSlice.categoryCourse);
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const [options, setOptions] = useState([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    // Khi giá trị keyword thay đổi, thực hiện tìm kiếm
    handleSearch(keyword);
  }, [keyword]);
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
  const handleSearch = (value) => {
    // Nếu giá trị người dùng nhập có độ dài lớn hơn 0, thì hiển thị gợi ý
    const showSuggestions = value.length > 0;
    const filteredOptions = showSuggestions
      ? categoryArr
          .filter((category) =>
            unidecode(category.maDanhMuc.toLowerCase()).includes(
              unidecode(value.toLowerCase())
            )
          )
          .map((category) => {
            const filteredCourses = courseVaidArr.filter(
              (course) =>
                course.danhMucKhoaHoc.maDanhMucKhoahoc === category.maDanhMuc
            );
            return {
              value: category.maDanhMuc,
              label: (
                <div>
                  <span>{`${category.maDanhMuc} (${filteredCourses.length} course)`}</span>
                </div>
              ),
              type: "category",
            };
          })
          .concat(
            courseVaidArr
              .filter((course) =>
                unidecode(course.tenKhoaHoc.toLowerCase()).includes(
                  unidecode(value.toLowerCase())
                )
              )
              .map((course) => ({
                value: course.maKhoaHoc,
                label: (
                  <div className="flex items-center justify-between ">
                    {/* Thêm ảnh vào đây, bạn có thể sử dụng cú pháp JSX để chèn đường dẫn ảnh */}
                    <span>{`${course.tenKhoaHoc} (${course.danhMucKhoaHoc.maDanhMucKhoahoc})`}</span>
                    <img
                      src={course.hinhAnh}
                      alt="Course Thumbnail"
                      className="w-20 hidden lg:block"
                    />
                  </div>
                ),
                type: "course",
              }))
          )
      : [];
    setOptions(filteredOptions);
  };
  const handleSelect = (value, option) => {
    const { type } = option;

    if (type === "category") {
      navigate(`/category/${value}`);
    } else {
      navigate(`/detail/${value}`);
    }
    setKeyword("");
  };

  return (
    <AutoComplete
      className="w-full"
      options={options}
      style={{
        width: 200,
      }}
      value={keyword}
      onSelect={handleSelect}
      onSearch={setKeyword}
      placeholder="Search for a course"
      notFoundContent={
        <p className="text-red-500  text-center">No matching results</p>
      }
    >
      <Input
        className=" rounded-3xl"
        suffix={
          <SearchOutlined className="transition duration-300 hover:text-color4 " />
        }
      />
    </AutoComplete>
  );
};

export default SearchItem;
