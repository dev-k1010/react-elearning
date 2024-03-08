import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userArr } from "../../redux/Admin/action/callAdminApi";
import { AutoComplete, Button, Input, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import unidecode from "unidecode";

export default function ManagerUserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listUserArr = useSelector((state) => state.listUserSlice.listUserArr);
  const [options, setOptions] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredData = listUserArr.filter((user) => {
    return Object.values(user).every(
      (value) => value !== null && value.trim() !== ""
    );
  });
  useEffect(() => {
    dispatch(userArr());
  }, [dispatch]);
  const columns = [
    {
      title: "No",
      dataIndex: "rowNumber",
      key: "rowNumber",
      render: (_, __, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      key: "hoTen",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "taiKhoan",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone number",
      dataIndex: "soDt",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ID User",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text) => {
        if (text == "HV") {
          return <Tag color="green">Học viên</Tag>;
        }
        return <Tag color="red">Giáo vụ</Tag>;
      },

      sorter: (a, b) => {
        // Sắp xếp theo mã loại người dùng
        return a.maLoaiNguoiDung.localeCompare(b.maLoaiNguoiDung);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <>
          <Button
            onClick={() => handleDelete(user.taiKhoan)}
            className="bg-red-500 px-2"
            size="middle"
          >
            <a>Delete</a>
          </Button>

          <Button
            onClick={() => handleEdit(user.taiKhoan)}
            className="bg-blue-500 px-2"
            size="middle"
          >
            <a>Edit</a>
          </Button>
        </>
      ),
    },
  ];
  const handleDelete = (values) => {
    dispatch(deleteUser(values));
  };
  const handleEdit = (values) => {
    if (values.trim() === "") {
      console.log(
        "Value is empty. Do something else or show an error message."
      );
      // Hoặc bạn có thể không thực hiện hành động nào đó khi giá trị là trống
    } else {
      console.log("🙂 ~ handleEdit ~ values:", values);
      navigate(`/edit/${values}`);
    }
  };
  const handleSearchUser = (values) => {
    const showSuggestions = values.length > 0;
    const filteredOptions =
      showSuggestions && listUserArr
        ? listUserArr
            .filter((user) => {
              const lowerCaseValue = unidecode(values.toLowerCase());

              return (
                user.taiKhoan &&
                unidecode(user.taiKhoan.toLowerCase()).includes(lowerCaseValue)
              );
            })
            .map((user) => ({
              value: user.taiKhoan || user.hoTen || user.email || user.soDt,
              label: user.taiKhoan,
            }))
        : [];
    setOptions(filteredOptions);

    const fillterUser =
      showSuggestions && listUserArr
        ? listUserArr.filter((user) => {
            const lowerCaseValue = unidecode(values.toLowerCase());
            return (
              user.taiKhoan &&
              unidecode(user.taiKhoan.toLowerCase()).includes(lowerCaseValue)
            );
          })
        : [];
    setSearchUser(fillterUser);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="space-y-5 p-10">
      <div className="flex justify-end items-center space-x-5">
        {/* Search*/}
        <div>
          <AutoComplete
            options={options}
            style={{
              width: 500,
            }}
            onSelect={(values) => {
              navigate(`/edit/${values}`);
            }}
            onSearch={handleSearchUser}
            placeholder="Search for a username"
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
        {/* Add */}
        <div>
          <button
            onClick={() => navigate("/addUser")}
            className="px-8 py-3 bg-color3 text-white rounded-2xl"
            j
          >
            Add user
          </button>
        </div>
      </div>
      {/* List */}
      <Table
        columns={columns}
        dataSource={searchUser.length > 0 ? searchUser : filteredData}
        pagination={{
          pageSize: 10,
          current: currentPage,
          onChange: onPageChange,
        }}
      />
    </div>
  );
}
