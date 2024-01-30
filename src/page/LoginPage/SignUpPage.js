import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, listUser } from "../../redux/User/action/callApi";
import Alert from "antd/es/alert/Alert";

export default function SignUpPage() {
  const onChange = (key) => {
    console.log(key);
  };
  const listUserArr = useSelector((state) => state.userSlice.listUser);
  console.log("🙂 ~ SignUpPage ~ listUserArr:", listUserArr);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showHelp, setShowHelp] = useState(false);
  useEffect(() => {
    // Set giá trị mặc định cho form từ hook useForm
    form.setFieldsValue({
      taiKhoan: String(""),
      matKhau: String(""),
      hoTen: String(""),
      soDt: String(""),
      maLoaiNguoiDung: String(""),
      maNhom: String(""),
      email: String(""),
    });
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
      // Có ít nhất một giá trị trùng lặp, hiển thị Modal
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

  const options = [
    {
      value: "GP09",
      label: "GP09",
    },
  ];
  return (
    <div className="grid grid-cols-2">
      <div></div>
      <Form
        className="mt-5"
        onFinish={(values) => onFinish(values)}
        form={form}
      >
        <div className=" px-10">
          <Form.Item
            name="taiKhoan"
            initialValue={""}
            rules={[
              {
                required: true,
                message: "Please enter your username!",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Username must have at least 8 characters and numbers",
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
          >
            <Input
              placeholder="Username"
              onChange={(e) => {
                // Sử dụng hàm normalize để chắc chắn rằng giá trị là chuỗi
                form.setFieldsValue({
                  taiKhoan: String(e.target.value),
                });
              }}
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Password must have at least 8 characters and numbers",
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
            <Input
              placeholder="Password"
              onChange={(e) => {
                // Sử dụng hàm normalize để chắc chắn rằng giá trị là chuỗi
                form.setFieldsValue({
                  matKhau: String(e.target.value),
                });
              }}
            />
          </Form.Item>
          {/* name */}
          <Form.Item
            name="hoTen"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
              {
                pattern: /^[a-zA-Z\u00C0-\u1EF3\s]+$/,
                message:
                  "Name should not contain numbers or special characters",
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
                // Sử dụng hàm normalize để chắc chắn rằng giá trị là chuỗi
                form.setFieldsValue({
                  hoTen: String(e.target.value),
                });
              }}
            />
          </Form.Item>
          {/* sdt */}
          <Form.Item
            name="soDt"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
              {
                pattern: /^[0-9]{9}$/,
                message: "Phone number must consist of 9 digits",
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
                // Sử dụng hàm normalize để chắc chắn rằng giá trị là chuỗi
                form.setFieldsValue({
                  soDt: String(e.target.value),
                });
              }}
            />
          </Form.Item>

          {/* Email */}
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
              onChange={(values) => dispatch(listUser(values))}
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
              className="bg-color3 text-white hover:bg-color4 hover:text-black border-none"
              htmlType="submit"
            >
              SignUp
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
