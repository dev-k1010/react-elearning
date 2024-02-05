import { AutoComplete, Button, Input, Table, Tag } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../redux/Admin/action/callAdminApi";
import { SearchOutlined } from "@ant-design/icons";
import unidecode from "unidecode";

export default function ManagerCoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCourseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const [options, setOptions] = useState([]);

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "IMG",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "View",
      dataIndex: "luotXem",
      key: "luotXem",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Creator",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      render: (text) => <a>{text.hoTen}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, course) => (
        <>
          <Button
            onClick={() => handleDelete(course.maKhoaHoc)}
            className="bg-red-500 px-2"
            size="middle"
          >
            <a>Delete</a>
          </Button>

          <Button
            // onClick={() => handleSetting(user.taiKhoan)}
            className="bg-blue-500 px-2"
            size="middle"
          >
            <a>Setting</a>
          </Button>
        </>
      ),
    },
  ];
  const handleSearchCourse = (values) => {
    const showSuggestions = values.length > 0;
    const filteredOptions =
      showSuggestions && listCourseArr
        ? listCourseArr
            .filter((course) => {
              const lowerCaseValue = unidecode(values.toLowerCase());
              return (
                (course.tenKhoaHoc &&
                  unidecode(course.tenKhoaHoc.toLowerCase()).includes(
                    lowerCaseValue
                  )) ||
                (course.maKhoaHoc &&
                  unidecode(course.maKhoaHoc.toLowerCase()).includes(
                    lowerCaseValue
                  ))
              );
            })
            .map((course) => ({
              value: course.tenKhoaHoc || course.maKhoaHoc,
              label: course.tenKhoaHoc || course.maKhoaHoc,
            }))
        : [];
    setOptions(filteredOptions);
  };

  const handleDelete = (values) => {
    dispatch(deleteCourse(values));
  };
  const handleSetting = (values) => {
    // navigate(`/setting/${values}`);
  };
  return (
    <div className="space-y-5 p-10">
      <div>
        <AutoComplete
          className="w-full"
          options={options}
          style={{
            width: 200,
          }}
          onSelect={(values) => {
            // navigate(`/setting/${values}`);
          }}
          onSearch={handleSearchCourse}
          placeholder="Sure, please provide the course ID or name course "
        >
          <Input
            className=" rounded-3xl"
            suffix={
              <SearchOutlined className="transition duration-300 hover:text-color4 " />
            }
            allowClear
          />
        </AutoComplete>
      </div>
      <button
        onClick={() => navigate("/addCourse")}
        className="px-6 py-4 bg-color3 text-white rounded-2xl"
      >
        Add course
      </button>
      <Table columns={columns} dataSource={listCourseArr} />
    </div>
  );
}
