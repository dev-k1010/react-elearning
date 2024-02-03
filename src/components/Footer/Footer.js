import React from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import {
  AmazonOutlined,
  DropboxOutlined,
  FacebookOutlined,
  GitlabOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  YahooOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Footer() {
  const courseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("🙂 ~ onFinish ~ values:", values.email);
    if (values.email && values.phone) {
      Modal.success({
        title: "Successfully Registered",
        content: (
          <div>
            <p>We will contact you in a moment!</p>
          </div>
        ),
        onOk: () => {
          form.resetFields();
        },
        okButtonProps: {
          className: "bg-color3 text-white",
        },
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderForm = () => {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-2"
      >
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
        >
          <Input
            placeholder="Email contact*"
            addonAfter={<MailOutlined className="text-color4" />}
          />
        </Form.Item>
        <Form.Item
          name="phone"
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
        >
          <Input placeholder="Phone number contact*" />
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-color2 hover:text-white hover:border-transparent"
            htmlType="submit"
          >
            REGISTER NOW
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className=" bg-color3 text-white p-4 space-y-5">
      <div className="flex md:flex-row flex-col items-center md:justify-between py-3 border-b">
        <span>
          Top companies <span className="border-b">choose</span>{" "}
          <span className="text-color4">Cybersoft</span> to build in-demand
          career skills.
        </span>
        <span className="space-x-5 ">
          <AmazonOutlined className="text-xl md:text-3xl " />
          <YahooOutlined className="text-xl md:text-3xl" />
          <LinkedinOutlined className="text-xl md:text-3xl " />
          <DropboxOutlined className="text-xl md:text-3xl" />
          <GitlabOutlined className="text-xl md:text-3xl" />
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-5 md:space-y-0 md:space-x-10">
        <div className="flex flex-col space-y-5">
          <img src="./IMG/logo-cyber-nav.svg" alt="" className="w-64" />
          <span className="bg-gradient-to-b from-color2 to-color4/80 text-center py-1 rounded-sm">
            Subscribe for Offers & New Articles
          </span>
          <p className="text-sm">
            CyberSoft will send online courses & completely FREE CyberLive
            programs, as well as attractive PROMOTIONS to you.
          </p>

          <div>{renderForm()}</div>
        </div>
        <div>
          <div className="space-y-5">
            <span>TOP SKILL</span>
            <span className="grid grid-cols-4 gap-4">
              {courseArr.slice(0, 20).map((course) => (
                <div className="w-12 h-12 ">
                  <img
                    src={course.hinhAnh}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
              ))}
            </span>
          </div>
        </div>
        <div className="space-y-5 flex flex-col">
          <span className="bg-color4  px-4 py-2 rounded-lg text-black text-center">
            CONSULT AND ENROLL
          </span>

          <span>
            <PhoneOutlined className="mr-5 text-xl text-color4" />
            <span>0961051014</span>
          </span>
          <span>
            <FacebookOutlined className="mr-5 text-xl text-color4" />
            <a
              className="hover:underline text-sm"
              href="https://www.facebook.com/lophocviet/"
            >
              CyberSoft - Project-Based Programming Training
            </a>
          </span>
          <span>
            <YoutubeOutlined className="mr-5 text-xl text-color4" />
            <a
              className="hover:underline text-sm"
              href="https://www.youtube.com/c/CyberSoftAcademy"
            >
              CyberSoft Academy Programming Experts
            </a>
          </span>
          <span>
            <MailOutlined className="mr-5 text-xl text-color4" />
            <span className="text-sm">info@cybersoft.edu.vn</span>
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-gray-400">Ho Chi Minh City</h2>
        <div className="flex space-x-3">
          <div className="my-2 space-y-3">
            <h2 className="text-color4 text-sm">
              Headquarters: 2Bis Nguyen Thi Minh Khai, District 1
            </h2>
            <div className="text-xs">
              <p>Hotline: 096.105.1014</p>
              <p>
                Address: 2Bis Nguyen Thi Minh Khai, District 1, Ho Chi Minh City
              </p>
            </div>
          </div>
          <div className="my-2 space-y-3">
            <h2 className="text-color4 text-sm">112 Cao Thang, District 3</h2>
            <div className="text-xs">
              <p>Hotline: 096.105.1014</p>
              <p>
                Address: Floor 5, Suri Building, 112 Cao Thang, District 3, Ho
                Chi Minh City
              </p>
            </div>
          </div>
          <div className="my-2 space-y-3">
            <h2 className="text-color4 text-sm">
              P3-00.05 Cityland Park Hills Apartment, Ward 10, Go Vap District
            </h2>
            <div className="text-xs">
              <p>Hotline: 096.105.1014</p>
              <p>
                Address: P3-00.05 Cityland Park Hills Apartment, Ward 10, Go Vap
                District, Ho Chi Minh City
              </p>
            </div>
          </div>
          <div className="my-2 space-y-3">
            <h2 className="text-color4 text-sm">
              6C Street No. 8, Linh Tay, Thu Duc (near Police University)
            </h2>
            <div className="text-xs">
              <p>Hotline: 096.105.1014</p>
              <p>
                Address: 6C Street No. 8, Linh Tay, Thu Duc, Ho Chi Minh City
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-gray-400">Da Nang City</h2>
        <div className="my-2 space-y-3">
          <h2 className="text-color4 text-sm">103 Nguyen Huu Dat, Hai Chau</h2>
          <div className="text-xs">
            <p>Hotline: 096.105.1014</p>
            <p>Address: 103 Nguyen Huu Dat, Hai Chau, Da Nang</p>
          </div>
        </div>
      </div>
    </div>
  );
}
