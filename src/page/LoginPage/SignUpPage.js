import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, listUser } from "../../redux/User/action/callApi";

export default function SignUpPage() {
  const listUserArr = useSelector((state) => state.userSlice.listUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showHelp, setShowHelp] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      taiKhoan: String(""),
      matKhau: String(""),
      hoTen: String(""),
      soDt: String(""),
      maLoaiNguoiDung: String(""),
      maNhom: String(""),
      email: String(""),
    });
    dispatch(listUser());
  }, [form]);

  const onFinish = (values) => {
    const isFormValid = form
      .getFieldsError()
      .every((field) => field.errors.length === 0);

    setShowHelp(!isFormValid || form.isFieldsTouched());

    const duplicateFields = Object.keys(values).filter((key) => {
      return listUserArr.some(
        (user) => user.hasOwnProperty(key) && values[key] === user[key]
      );
    });

    if (duplicateFields.length > 0) {
      Modal.error({
        title: "Duplicate Values",
        content: (
          <div>
            <p>The values for the following fields are already in use:</p>
            <ul>
              {duplicateFields.map((field) => (
                <li className="text-red-700" key={field}>
                  {field}
                </li>
              ))}
            </ul>
            <p>Please choose different values.</p>
          </div>
        ),
        okButtonProps: {
          className: "bg-red-500 text-white",
        },
      });
    } else {
      dispatch(addUser(values));
    }
  };
  const onValuesChange = () => {
    setShowHelp(true); // Hiển thị lỗi ngay khi có sự thay đổi
  };

  const options = [
    {
      value: "GP09",
      label: "GP09",
    },
  ];
  return (
    <div
      style={{
        backgroundImage: `url("./IMG/bg3.jpg")`,
      }}
    >
      <div className=" grid grid-cols-1 overflow-hidden items-center justify-center h-screen w-screen md:px-10 lg:px-40">
        <Form
          className="backdrop-blur-lg bg-white/20 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-8 items-center justify-center rounded-2xl p-5 md:space-x-3 "
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          initialValue={""}
          form={form}
        >
          <span className="hidden md:block md:col-span-3 lg:col-span-5 ">
            <div className="md:h-full md:w-full md:grid md:grid-cols-1 justify-center items-center">
              <img src="./IMG/web.jpg" alt="" />
            </div>
          </span>
          <div className="lg:col-span-3 col-span-2 h-full w-full grid grid-cols-1 items-center justify-center">
            <Form.Item
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "Include  8 characters and numbers",
                },
              ]}
              help={
                showHelp &&
                form
                  .getFieldsError()
                  .find((item) => item.name === "taiKhoan")
                  ?.errors.map((error) => (
                    <div
                      key={error.status}
                      style={{
                        color: error.status === "error" ? "#ff4d4f" : "#bfbfbf",
                      }}
                    >
                      {error.message}
                    </div>
                  ))
              }
              valuePropName="value"
            >
              <Input
                placeholder="Username"
                onChange={(e) => {
                  form.setFieldsValue({
                    taiKhoan: String(e.target.value),
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "Include  8 characters and numbers",
                },
              ]}
              help={
                showHelp &&
                form
                  .getFieldsError()
                  .find((item) => item.name === "matKhau")
                  ?.errors.map((error) => (
                    <div
                      key={error.status}
                      style={{
                        color: error.status === "error" ? "#ff4d4f" : "#bfbfbf",
                      }}
                    >
                      {error.message}
                    </div>
                  ))
              }
            >
              <Input.Password
                placeholder="Password"
                onChange={(e) => {
                  form.setFieldsValue({
                    matKhau: String(e.target.value),
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                },
                {
                  pattern: /^[a-zA-Z\u00C0-\u1EF3\s]+$/,
                  message: "Should not contain numbers or special characters",
                },
              ]}
              help={
                showHelp &&
                form
                  .getFieldsError()
                  .find((item) => item.name === "hoTen")
                  ?.errors.map((error) => (
                    <div
                      key={error.status}
                      style={{
                        color: error.status === "error" ? "#ff4d4f" : "#bfbfbf",
                      }}
                    >
                      {error.message}
                    </div>
                  ))
              }
            >
              <Input
                placeholder="Fullname"
                onChange={(e) => {
                  form.setFieldsValue({
                    hoTen: String(e.target.value),
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="soDt"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number!",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Phone number must consist of 10 digits",
                },
              ]}
              help={
                showHelp &&
                form
                  .getFieldsError()
                  .find((item) => item.name === "soDt")
                  ?.errors.map((error) => (
                    <div
                      key={error.status}
                      style={{
                        color: error.status === "error" ? "#ff4d4f" : "#bfbfbf",
                      }}
                    >
                      {error.message}
                    </div>
                  ))
              }
            >
              <Input
                placeholder="Phone number"
                onChange={(e) => {
                  form.setFieldsValue({
                    soDt: String(e.target.value),
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter a valid email!",
                },
                {
                  pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Please enter a valid email!",
                },
              ]}
              help={
                showHelp &&
                form
                  .getFieldsError()
                  .find((item) => item.name === "email")
                  ?.errors.map((error) => (
                    <div
                      key={error.status}
                      style={{
                        color: error.status === "error" ? "#ff4d4f" : "#bfbfbf",
                      }}
                    >
                      {error.message}
                    </div>
                  ))
              }
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="maNhom"
              rules={[
                {
                  required: true,
                  message: "Please select ID!",
                },
              ]}
            >
              <Select
                placeholder="ID"
                style={{
                  width: 120,
                }}
                options={options}
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
                SignUp
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
