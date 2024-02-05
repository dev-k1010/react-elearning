import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../../redux/Admin/action/callAdminApi";

export default function AddCourse() {
  const listCourseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const user = useSelector((state) => state.userSlice.user);
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const listCategoryArr = useSelector(
    (state) => state.dataSlice.categoryCourse
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showHelp, setShowHelp] = useState(false);
  console.log("🙂 ~ AddCourse ~ listCategoryArr:", listCategoryArr);
  useEffect(() => {
    form.setFieldsValue({
      maKhoaHoc: String(""),
      biDanh: String(""),
      tenKhoaHoc: String(""),
      moTa: String(""),
      luotXem: Number(""),
      danhGia: Number(""),
      hinhAnh: "https://elearningnew.cybersoft.edu.vn/hinhanh/",
      maNhom: user.maNhom,
      ngayTao: Date(""),
      maDanhMucKhoaHoc: String(""),
      taiKhoanNguoiTao: user.taiKhoan,
    });
  }, [form]);
  const optionsCategory = listCategoryArr.map((name, index) => ({
    value: name.maDanhMuc,
    label: name.maDanhMuc,
  }));
  const onFinish = (values) => {
    console.log("🙂 ~ onFinish ~ values:", values);
    dispatch(addCourse(values));
  };
  const onChange = (date, dateString) => {
    // Cập nhật giá trị của trường ngayTao
    form.setFieldsValue({
      ngayTao: dateString,
    });
  };
  return (
    <div>
      {" "}
      <Form
        onFinish={onFinish}
        onValuesChange={(changedValues, allValues) => {
          // Kiểm tra xem trường tenKhoaHoc có thay đổi không
          if ("tenKhoaHoc" in changedValues) {
            // Lấy giá trị mới của tenKhoaHoc
            const newTenKhoaHoc = changedValues.tenKhoaHoc;
            // Cập nhật state và sử dụng nó để cập nhật hinhAnh
            setTenKhoaHoc(newTenKhoaHoc);
            form.setFieldsValue({
              hinhAnh: `https://elearningnew.cybersoft.edu.vn/hinhanh/${newTenKhoaHoc}_gp09.png`,
            });
          }
        }}
        initialValue={""}
        form={form}
        className="grid grid-cols-2 space-x-5 p-20"
      >
        <Form.Item name="maKhoaHoc" label="ID course">
          <Input />
        </Form.Item>
        <Form.Item name="biDanh" label="Alias">
          <Input />
        </Form.Item>
        <Form.Item name="tenKhoaHoc" label="Name course">
          <Input />
        </Form.Item>

        <Form.Item name="luotXem" label="View">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="danhGia" label="Review">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="maNhom" label="ID Group">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="maDanhMucKhoaHoc"
          label="ID category"
          rules={[
            {
              required: true,
              message: "Please select date!",
            },
          ]}
        >
          <Select
            placeholder="Select ID category"
            style={{
              width: 200,
            }}
            options={optionsCategory}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item name="hinhAnh" label="Image">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="ngayTao"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please select date!",
            },
          ]}
        >
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
            {/* <DatePicker onChange={onChange} picker="week" />
     <DatePicker onChange={onChange} picker="month" />
     <DatePicker onChange={onChange} picker="quarter" />
     <DatePicker onChange={onChange} picker="year" /> */}
          </Space>
        </Form.Item>
        <Form.Item name="taiKhoanNguoiTao" label="Creator">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item name="moTa" label="Description">
          <TextArea rows={4} placeholder="Description course" />
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
            Add course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
