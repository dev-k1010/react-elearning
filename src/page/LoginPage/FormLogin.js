import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/action/user";
import { FaUser } from "react-icons/fa";

export default function FormLogin() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(loginAction(values, navigate));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderFormLogin = () => {
    return (
      <Form
      className="w-full max-w-md mx-auto"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
            // {
            //   min: 8,
            //   message: "Password must be at least 8 characters!",
            // },
            // {
            //   pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            //   message:
            //     "Password must contain at least one letter and one number!",
            // },
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
            className="bg-blue-700 hover:border-transparent"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className="grid grid-cols-2">
      <div className="border border-red-300"></div>
      <div className="border border-blue-300 flex justify-center items-center">
        {renderFormLogin()}
      </div>
    </div>
  );
}
