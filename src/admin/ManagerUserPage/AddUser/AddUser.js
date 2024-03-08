import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAdmin,
  userArr,
} from "../../../redux/Admin/action/callAdminApi";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const listUserArr = useSelector((state) => state.listUserSlice.listUserArr);
  const navigate = useNavigate();
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
    dispatch(userArr());
  }, [form]);

  const onFinish = (values) => {
    const isFormValid = form
      .getFieldsError()
      .every((field) => field.errors.length === 0);

    setShowHelp(!isFormValid || form.isFieldsTouched());
    const duplicateFields = Object.keys(values).filter((key) => {
      if (key !== "maLoaiNguoiDung") {
        return listUserArr.some(
          (user) => user.hasOwnProperty(key) && values[key] === user[key]
        );
      }
      return false;
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
      dispatch(addUserAdmin(values));
      navigate("/managerUser");
    }
  };
  const onValuesChange = () => {
    setShowHelp(true); // Hiển thị lỗi ngay khi có sự thay đổi
  };

  const optionsId = [
    {
      value: "GP09",
      label: "GP09",
    },
  ];
  const optionsUser = [
    {
      value: "HV",
      label: "HV",
    },
    {
      value: "GV",
      label: "GV",
    },
  ];
  return (
    <div>
      <Form
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValue={""}
        form={form}
        className="grid grid-cols-2 space-x-5 p-20"
      >
        <Form.Item
          name="taiKhoan"
          label="Username"
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
          label="Password"
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
          label="Fullname"
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
          label="Phone number"
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
          label="Email"
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
          label="Select ID"
          rules={[
            {
              required: true,
              message: "Please select ID!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select ID"
            style={{
              width: 200,
            }}
            options={optionsId}
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          name="maLoaiNguoiDung"
          label="Select ID User"
          rules={[
            {
              required: true,
              message: "Please select ID!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select ID User"
            style={{
              width: 200,
            }}
            options={optionsUser}
            optionFilterProp="label"
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
            Add user
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
