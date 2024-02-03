import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/User/action/callApi";

export default function FormLogin() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(loginAction(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderFormLogin = () => {
    return (
      <Form
        className="backdrop-blur-lg bg-white/20 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-8 items-center justify-center rounded-2xl p-5 md:space-x-3 "
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <span className="hidden md:block md:col-span-3 lg:col-span-5 ">
          <div className="md:h-full md:w-full md:grid md:grid-cols-1 justify-center items-center">
            <img src="./IMG/web.jpg" alt="" />
          </div>
        </span>
        <div className="lg:col-span-3 col-span-2  grid grid-cols-1 items-center justify-center ">
          <Form.Item
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              className="bg-color3 text-white hover:border-transparent"
              htmlType="submit"
            >
              Login In
            </Button>
            <Button
              className="bg-color3 text-white hover:border-transparent"
              htmlType="submit"
              onClick={() => (window.location.href = "/signUp")}
            >
              Sign Up
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  };
  return (
    <div
      style={{
        backgroundImage: `url("./IMG/bg3.jpg")`,
      }}
    >
      <div className=" grid grid-cols-1 overflow-hidden  items-center justify-center h-screen w-screen md:px-10 lg:px-40">
        {renderFormLogin()}
      </div>
    </div>
  );
}
