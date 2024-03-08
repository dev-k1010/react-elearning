import { AutoComplete, Button, Input, Modal, Table, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCourse,
  detailCourse,
  listConfirm,
  listUserConfirm,
} from "../../redux/Admin/action/callAdminApi";
import { SearchOutlined } from "@ant-design/icons";
import unidecode from "unidecode";
import TabsAcceptUser from "./TabsAcceptUser/TabsAcceptUser";
import TabsConfirm from "./TabsConfirm/TabsConfirm";

export default function ManagerCoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCourseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectCourse, setSelectCourse] = useState();
  const [filteredCourseList, setFilteredCourseList] = useState([]); // Khóa học theo từ khóa tìm kiếm
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 5; // số lượng phần tử hiển thị của 1 trang
  useEffect(() => {
    // Tìm kiếm khóa học dựa vào searchValue
    setFilteredCourseList(
      listCourseArr.filter((course) => {
        const lowerCaseValue = unidecode(searchValue.toLowerCase());
        return (
          course.tenKhoaHoc &&
          unidecode(course.tenKhoaHoc.toLowerCase()).includes(lowerCaseValue)
        );
      })
    );
  }, [searchValue, listCourseArr]);
  const columns = [
    {
      title: "No",
      dataIndex: "rowNumber",
      key: "rowNumber",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
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
      render: (text) => (
        <img src={text} alt="Image" style={{ maxWidth: "90px" }} />
      ),
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
            onClick={() => handleEdit(course.maKhoaHoc)}
            className="bg-blue-500 px-2"
            size="middle"
          >
            <a>Edit</a>
          </Button>
        </>
      ),
    },
  ];
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchCourse = (values) => {
    const showSuggestions = values.length > 0;
    const filteredOptions =
      showSuggestions && listCourseArr
        ? listCourseArr
            .filter((course) => {
              const lowerCaseValue = unidecode(values.toLowerCase());
              return (
                course.tenKhoaHoc &&
                unidecode(course.tenKhoaHoc.toLowerCase()).includes(
                  lowerCaseValue
                )
              );
            })
            .map((course) => {
              return {
                value: course.maKhoaHoc,
                label: (
                  <div className="flex items-center justify-between">
                    <span>{course.tenKhoaHoc}</span>
                    <img
                      src={course.hinhAnh}
                      alt="Course Thumbnail"
                      className="w-20"
                    />
                  </div>
                ),
              };
            })
        : [];
    // Gợi ý lựa chọn cho người dùng
    setOptions(filteredOptions);
    // Lọc khóa học theo từ khóa người dùng nhập
    setSearchValue(values);
  };
  const handleDelete = (values) => {
    dispatch(deleteCourse(values));
  };
  const handleEdit = (values) => {
    const course = listCourseArr.find((course) => {
      return course.maKhoaHoc === values;
    });
    // Thông báo nếu có bất kì key nào null
    const nullKeys = checkNullValue(course);

    if (nullKeys.length > 0) {
      Modal.error({
        title: "Registered Course",
        content: (
          <div>
            <p>Error database! The following keys have null values:</p>
            <ul>
              {nullKeys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </div>
        ),
        okButtonProps: {
          className: "bg-red-500 text-white",
        },
        onOk: () => {
          // Nếu người dùng bấm OK thì thực hiện navigate
          dispatch(detailCourse(values));
          window.location.href = `/settingCourse/${values}`;
        },
      });
    } else {
      dispatch(detailCourse(values));
      window.location.href = `/settingCourse/${values}`;
    }
  };
  const checkNullValue = (obj) => {
    const nullKeys = [];

    const checkNullValue = (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          // Kiểm tra giá trị của key
          if (value === null) {
            nullKeys.push(key); // Thêm key vào danh sách nullKeys
          }

          // Nếu giá trị là một object hoặc array, thực hiện kiểm tra đệ quy
          if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
              // Nếu giá trị là một array, kiểm tra từng phần tử trong array
              for (let i = 0; i < value.length; i++) {
                checkNullValue(value[i]); // Gọi đệ quy
              }
            } else {
              // Nếu giá trị là một object, thực hiện kiểm tra đệ quy
              checkNullValue(value); // Gọi đệ quy
            }
          }
        }
      }
    };

    checkNullValue(obj);

    return nullKeys;
  };
  const handleSelectCourse = (course) => {
    dispatch(listConfirm(course));
    dispatch(listUserConfirm(course));
    setSelectCourse(course);
  };
  const items = [
    {
      key: 1,
      label: (
        <div className="flex flex-col justify-between items-center space-y-4">
          <span className="text-color4 text-lg bg-color2 px-4 py-1">
            {selectCourse ? selectCourse.tenKhoaHoc : <></>}
          </span>
          <img
            src={selectCourse ? selectCourse.hinhAnh : <></>}
            className="w-24 transition duration-300 ease-in-out transform hover:scale-105  border-b-2 "
            alt=""
          />
        </div>
      ),
      children: (
        <Tabs
          tabPosition={"left"}
          items={[
            {
              key: 3,
              label: (
                <div
                  style={{
                    width: 500,
                  }}
                >
                  <TabsAcceptUser
                    idCourse={selectCourse ? selectCourse.maKhoaHoc : ""}
                  />
                </div>
              ),
              children: (
                <Tabs
                  tabPosition={"left"}
                  items={[
                    {
                      key: 3,
                      label: (
                        <div
                        //   style={{
                        //     width: 600,
                        //   }}
                        >
                          <TabsConfirm
                            idCourse={
                              selectCourse ? selectCourse.maKhoaHoc : ""
                            }
                          />
                        </div>
                      ),
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5 p-10">
      <div className="flex justify-end items-center space-x-5 ">
        {/* Tìm kiếm khóa học */}
        <div>
          <AutoComplete
            options={options}
            style={{
              width: 500,
            }}
            onSelect={(values) => {
              const courseTabs = listCourseArr
                .filter((course) => course.maKhoaHoc === values)
                .map((course) => {
                  // Chọn khóa học cho Tabs hiển thị
                  setSelectCourse(course);
                  // Tìm kiếm duy nhất một kháo học
                  setSearchValue(course.tenKhoaHoc);
                });
            }}
            onSearch={handleSearchCourse}
            placeholder="Search for courses by name"
            notFoundContent={
              <p className="text-red-500  text-center">No matching results</p>
            }
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
        {/* Thêm khóa học  */}
        <div>
          <button
            onClick={() => navigate("/addCourse")}
            className="px-6 py-4 bg-color3 text-white rounded-2xl"
          >
            Add course
          </button>
        </div>
      </div>
      <Table
        rowKey="maKhoaHoc" // Cung cấp một khóa duy nhất cho mỗi hàng
        onRow={(record) => ({
          onClick: () => handleSelectCourse(record),
        })}
        columns={columns}
        dataSource={
          filteredCourseList.length > 0 ? filteredCourseList : listCourseArr
        }
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          onChange: onPageChange,
        }}
      />
      <div className=" border ">
        {selectCourse ? (
          <Tabs
            tabPosition={"left"}
            defaultActiveKey="1"
            items={items}
            // onChange={onChange}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
