import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import unidecode from "unidecode";
import { useSelector } from "react-redux";

const SearchItem = () => {
  const categoryArr = useSelector((state) => state.dataSlice.categoryCourse);
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    // Nếu giá trị người dùng nhập có độ dài lớn hơn 0, thì hiển thị gợi ý
    const showSuggestions = value.length > 0;

    const filteredOptions = showSuggestions
      ? categoryArr
          .filter((course) =>
            unidecode(course.maDanhMuc.toLowerCase()).includes(
              unidecode(value.toLowerCase())
            )
          )
          .map((course) => ({ value: course.maDanhMuc }))
          .concat(
            courseArr
              .filter((course) =>
                unidecode(course.tenKhoaHoc.toLowerCase()).includes(
                  unidecode(value.toLowerCase())
                )
              )
              .map((course) => ({ value: course.tenKhoaHoc }))
          )
      : [];
    setOptions(filteredOptions);
  };

  return (
    <AutoComplete
      className="w-full"
      options={options}
      style={{
        width: 200,
      }}
      onSelect={(value) => {
        navigate(`/searchCourse/${value}`);
      }}
      onSearch={handleSearch}
      placeholder="Search for a course"
    >
      <Input
        className=" rounded-3xl"
        suffix={
          <SearchOutlined className="transition duration-300 hover:text-color4 " />
        }
        allowClear
      />
    </AutoComplete>
  );
};

export default SearchItem;
