import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Footer() {
  const renderForm = () => {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Email liên hệ *" addonAfter={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input placeholder="Điện thoại liên hệ *" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <h2>Nhấn chọn vào ô bên dưới *</h2>
          <Checkbox>I'm not a robot</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-color2 hover:text-white hover:border-transparent"
            htmlType="submit"
          >
            ĐĂNG KÝ NGAY
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className="grid grid-cols-3 space-x-5 mt-10">
      <div className="flex flex-col">
        <img src="./IMG/logo-cyber-nav.svg" alt="" className="w-64" />
        <h2>Đăng ký nhận Ưu đãi & Bài viết mới</h2>
        <p>
          CyberSoft sẽ gởi các khóa học trực tuyến & các chương trình CyberLive
          hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn đến các bạn.
        </p>
        <div>{renderForm()}</div>
      </div>
      <div>
        <div>
          <h2>TP.Hồ Chí Minh</h2>
          <div className="border-2 border-red-800 my-2">
            <h2>Trụ sở: 2Bis Nguyễn Thị Minh Khai, Quận 1</h2>
            <p>Hotline: 096.105.1014</p>
            <p>Địa chỉ: 2Bis Nguyễn Thị Minh Khai, Quận 1, TPHCM</p>
          </div>
          <div className="border-2 border-red-800 my-2">
            <h2>Trụ sở: 2Bis Nguyễn Thị Minh Khai, Quận 1</h2>
            <p>Hotline: 096.105.1014</p>
            <p>Địa chỉ: 2Bis Nguyễn Thị Minh Khai, Quận 1, TPHCM</p>
          </div>
          <div className="border-2 border-red-800 my-2">
            <h2>Trụ sở: 2Bis Nguyễn Thị Minh Khai, Quận 1</h2>
            <p>Hotline: 096.105.1014</p>
            <p>Địa chỉ: 2Bis Nguyễn Thị Minh Khai, Quận 1, TPHCM</p>
          </div>
          <div className="border-2 border-red-800 my-2">
            <h2>Trụ sở: 2Bis Nguyễn Thị Minh Khai, Quận 1</h2>
            <p>Hotline: 096.105.1014</p>
            <p>Địa chỉ: 2Bis Nguyễn Thị Minh Khai, Quận 1, TPHCM</p>
          </div>
          <div className="border-2 border-red-800 my-2">
            <h2>Trụ sở: 2Bis Nguyễn Thị Minh Khai, Quận 1</h2>
            <p>Hotline: 096.105.1014</p>
            <p>Địa chỉ: 2Bis Nguyễn Thị Minh Khai, Quận 1, TPHCM</p>
          </div>
        </div>
      </div>
      <div>
        <Button className="bg-color4">TƯ VẤN VÀ ĐĂNG KÝ KHÓA HỌC</Button>
      </div>
    </div>
  );
}
