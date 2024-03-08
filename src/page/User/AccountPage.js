import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoDetailUser, updateUser } from "../../redux/User/action/callApi";
import { AutoComplete, Button, Form, Input, Tabs } from "antd";
import CardItem from "../../components/Card/CardItem";
import unidecode from "unidecode";
import { SearchOutlined } from "@ant-design/icons";

export default function AccountPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const detailUser = useSelector((state) => state.userSlice.detailUser);
  const courseArr = detailUser.chiTietKhoaHocGhiDanh;
  const [options, setOptions] = useState([]);
  const [nameCourse, setNameCourse] = useState([]);

  // Cập nhật lại thông tin
  useEffect(() => {
    dispatch(infoDetailUser(user.taiKhoan));
    window.scrollTo(0, 0);
  }, [user]);

  // Gửi thông tin cần thay đổi lên server
  const onFinish = (values) => {
    dispatch(updateUser(values));
    window.location.reload();
  };

  const handleSearch = (value) => {
    // Gơi ý theo kí tự khi người dùng nhập
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
    // Lưu các gợi ý vào "options" để hiển thị cho người dùng chọn
    setOptions(filteredOptions);
  };

  // Thực hiện tìm kiếm khóa học trùng với từ khóa
  const handleOnSelect = (value) => {
    const valueSearch = courseArr.filter((course) => {
      return course.tenKhoaHoc === value;
    });
    // Lưu khóa học đã tìm thấy vào "nameCourse"
    setNameCourse(valueSearch);
  };

  const items = [
    // Thông tin chi tiết người dùng
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

    // Danh sách khóa học đã đăng kí
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
                {/* Hiển thị tất cả nếu người dùng không tìm kiếm */}
                {courseArr &&
                  courseArr.map((course, index) => {
                    return (
                      <CardItem
                        key={index}
                        course={course}
                        stypeCard={2}
                        detailUser={detailUser}
                        isAccontPage={true}
                        user={user}
                      />
                    );
                  })}
              </>
            ) : (
              <>
                {nameCourse &&
                  nameCourse.map((course, index) => {
                    return (
                      <CardItem
                        key={index}
                        course={course}
                        stypeCard={2}
                        detailUser={detailUser}
                        isAccontPage={true}
                        user={user}
                      />
                    );
                  })}
              </>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2  lg:p-10">
      <h2 className="py-4 bg-gradient-to-b from-color3/90 to-color2 p-5 text-color4 text-md font-medium">
        Account information
      </h2>
      <Tabs
        className="mx-2 md:mx-10 lg:mx-40"
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
}
