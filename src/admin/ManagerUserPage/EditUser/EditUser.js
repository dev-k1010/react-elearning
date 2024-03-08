import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserAdmin } from "../../../redux/Admin/action/callAdminApi";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Button, Form, Input, Select, Tabs, message } from "antd";
import { https } from "../../../service/config";
import WaitCourse from "./WaitCourse";

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idUser } = useParams();
  const [user, setUser] = useState({});
  const listCourseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const [waitList, setWaitList] = useState([]);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const courseArr = listCourseArr.filter((course) =>
    waitList
      .map((waitCourse) => waitCourse.maKhoaHoc)
      .includes(course.maKhoaHoc)
  );
  // Tìm kiếm khóa học
  const infoUser = (values) => {
    https(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP09&tuKhoa=${values}`)
      .then((res) => {
        let userDetail = res.data.find((user) => user);
        setUser(userDetail);
        courseRegister(userDetail);
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
  // Lấy danh sách duyệt chờ xét duyệt
  const courseRegister = (values) => {
    https
      .post("/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", values)
      .then((res) => {
        setWaitList(res.data);
      })
      .catch((err) => {
        console.log("🙂 ~ courseRegister ~ err:", err);
      });
  };
  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");
    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    }
  }, []);
  useEffect(() => {
    infoUser(idUser);
  }, [idUser]);
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  const onFinish = (values) => {
    dispatch(updateUserAdmin(values));
    navigate("/managerUser");
  };
  const optionsId = [
    {
      value: "GP09",
      label: "GP09",
    },
  ];
  const optionsIdUser = [
    {
      value: "HV",
      label: "Học viên",
    },
    {
      value: "GV",
      label: "Giáo vụ",
    },
  ];
  const items = [
    {
      key: "1",
      label: "Info User",
      children: (
        <Form
          form={form}
          onFinish={onFinish}
          className="grid grid-cols-2 space-x-5 p-20"
        >
          <div>
            <Form.Item name="taiKhoan" label="Username">
              <Input />
            </Form.Item>
            <Form.Item name="matKhau" label="Password">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="soDt" label="Phone number">
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="hoTen" label="Full name">
              <Input />
            </Form.Item>
            <Form.Item
              name="maNhom"
              label="ID"
              initialValue={optionsId[0].value}
            >
              <Select
                style={{
                  width: 120,
                }}
                options={optionsId}
                defaultValue={`${optionsId[0].label}`}
              />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung" label="ID User">
              <Select
                placeholder="ID"
                style={{
                  width: 120,
                }}
                options={optionsIdUser}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="bg-color3 text-white hover:bg-color4 hover:text-black border-none w-32"
                htmlType="submit"
              >
                Update User
              </Button>
            </Form.Item>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Wait Course",
      children: (
        <div>
          <WaitCourse courseArr={courseArr} user={user} />
        </div>
      ),
    },
  ];
  const handleNavigation = () => {
    // Thực hiện các xử lý khác nếu cần thiết
    navigate("/managerUser");
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
    localStorage.setItem("activeTab", key);
  };
  return (
    <div className="space-y-5 p-10">
      <div>
        <Breadcrumb
          items={[
            {
              title: <a onClick={handleNavigation}>Manager user</a>,
            },
            {
              title: "Edit user",
            },
          ]}
        />
        <Tabs
          className="mx-2 md:mx-10 lg:mx-40"
          activeKey={activeTab} // Đặt activeKey để điều khiển tab đang hoạt động
          onChange={handleTabChange} // Thêm bộ xử lý onChange
          items={items}
        />
      </div>
    </div>
  );
}
