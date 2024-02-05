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
  useEffect(() => {
    dispatch(userArr());
  }, [dispatch]);
  const columns = [
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
            onClick={() => handleSetting(user.taiKhoan)}
            className="bg-blue-500 px-2"
            size="middle"
          >
            <a>Setting</a>
          </Button>
        </>
      ),
    },
  ];
  const handleDelete = (values) => {
    dispatch(deleteUser(values));
  };
  const handleSetting = (values) => {
    navigate(`/setting/${values}`);
  };
  const handleSearchUser = (values) => {
    const showSuggestions = values.length > 0;
    const filteredOptions =
      showSuggestions && listUserArr
        ? listUserArr
            .filter((user) => {
              const lowerCaseValue = unidecode(values.toLowerCase());
              return (
                (user.taiKhoan &&
                  unidecode(user.taiKhoan.toLowerCase()).includes(
                    lowerCaseValue
                  )) ||
                (user.hoTen &&
                  unidecode(user.hoTen.toLowerCase()).includes(
                    lowerCaseValue
                  )) ||
                (user.email &&
                  unidecode(user.email.toLowerCase()).includes(
                    lowerCaseValue
                  )) ||
                (user.soDt &&
                  unidecode(user.soDt.toLowerCase()).includes(lowerCaseValue))
              );
            })
            .map((user) => ({
              value: user.taiKhoan || user.hoTen || user.email || user.soDt,
              label: user.taiKhoan || user.hoTen || user.email || user.soDt,
            }))
        : [];
    setOptions(filteredOptions);
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
            navigate(`/setting/${values}`);
          }}
          onSearch={handleSearchUser}
          placeholder="Search for a user"
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
        onClick={() => navigate("/addUser")}
        className="px-6 py-4 bg-color3 text-white rounded-2xl"
      >
        Add user
      </button>
      <Table columns={columns} dataSource={listUserArr} />
    </div>
  );
}
