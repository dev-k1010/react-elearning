import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { infoDetailUser, updateUser } from "../../redux/User/action/callApi";
import { AutoComplete, Button, Form, Input, Tabs } from "antd";
import CardItem from "../../components/Card/CardItem";
import { spaceChildren } from "antd/es/button";
import unidecode from "unidecode";
import { SearchOutlined } from "@ant-design/icons";

export default function AccountPage() {
  const dispatch = useDispatch();
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  let courseArr = detailUser.chiTietKhoaHocGhiDanh;

  const [options, setOptions] = useState([]);
  console.log("🙂 ~ AccountPage ~ options:", options);
  const [nameCourse, setNameCourse] = useState([]);
  console.log("Is nameCourse an array?", nameCourse);

  const onFinish = (values) => {
    dispatch(updateUser(values));
  };

  const onChange = (key) => {
    console.log(key);
  };
  const handleSearch = (value) => {
    // Nếu giá trị người dùng nhập có độ dài lớn hơn 0, thì hiển thị gợi ý
    const filteredOptions =
      value.length > 0
        ? courseArr
            .filter((course) =>
              unidecode(course.tenKhoaHoc.toLowerCase()).includes(
                unidecode(value.toLowerCase())
              )
            )
            .map((course) => ({ value: course.tenKhoaHoc }))
        : [];
    setOptions(filteredOptions);
  };

  const handleOnSelect = (value) => {
    const valueSearch = courseArr.filter((course) => {
      return course.tenKhoaHoc === value;
    });
    console.log("🙂 ~ handleOnSelect ~ valueSearch:", valueSearch);
    setNameCourse(valueSearch);
  };

  const items = [
    {
      key: "1",
      label: (
        <span className="hover:text-color4 focus:text-color4">Account</span>
      ),
      children: (
        <Form
          className="space-x-5 mt-5 grid grid-cols-2
      "
          onFinish={onFinish}
          initialValues={detailUser}
        >
          <div>
            <Form.Item name="taiKhoan" label="Username">
              <Input />
            </Form.Item>
            <Form.Item name="matKhau" label="Password">
              <Input />
            </Form.Item>
            <Form.Item name="hoTen" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="soDT" label="Phone">
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="maLoaiNguoiDung" label="ID">
              <Input />
            </Form.Item>
            <Form.Item name="maNhom" label="Group">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="bg-color3 text-white hover:bg-color4 hover:text-black border-none"
                htmlType="submit"
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: (
        <span className="hover:text-color4 focus:text-color4">
          Registered Course
        </span>
      ),
      children: (
        <div className="space-y-5 mt-5">
          <div>
            <AutoComplete
              className="w-full"
              options={options}
              style={{
                width: 200,
              }}
              onSelect={(value) => handleOnSelect(value)}
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
          </div>
          <div>
            {options.length === 0 ? (
              <>
                {courseArr.map((course, index) => {
                  return (
                    <CardItem
                      key={index}
                      course={course}
                      stypeCard={2}
                      isCategoryPage={true}
                      isAccontPage={true}
                    />
                  );
                })}
              </>
            ) : (
              nameCourse.map((course, index) => {
                return (
                  <CardItem
                    key={index} // Đảm bảo sử dụng key duy nhất
                    course={course}
                    stypeCard={2}
                    isCategoryPage={true}
                    isAccontPage={true}
                  />
                );
              })
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-16 space-y-2">
      <h2 className="py-4 bg-gradient-to-b from-color3/90 to-color2 p-5 text-color4 text-md font-medium">
        Account information
      </h2>
      <Tabs
        className="mx-40"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
