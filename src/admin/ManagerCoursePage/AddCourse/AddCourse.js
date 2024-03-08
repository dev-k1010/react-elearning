import {
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { addCourseNew } from "../../../redux/Admin/action/callAdminApi";

export default function AddCourse() {
  const navigate = useNavigate();
  const listCategoryArr = useSelector(
    (state) => state.dataSlice.categoryCourse
  );
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const optionsCategory = listCategoryArr.map((name, index) => ({
    value: name.maDanhMuc,
    label: name.maDanhMuc,
  }));
  const [hinhAnh, setHinhAnh] = useState();
  const [newFileName, setNewFileName] = useState();

  useEffect(() => {
    form.setFieldsValue({
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      maNhom: user.maNhom,
      ngayTao: moment(),
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: user.taiKhoan,
    });
  }, [form, user.maNhom, user.taiKhoan]);

  // Đổi tên ảnh mặc định dựa vào tên người dùng nhập
  const nameCourse = (e) => {
    let values = e.target.value;
    values = values
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
    // Trường hợp người dùng nhập tên trước nhập ảnh sau
    setNewFileName(values);
    // Trường hợp người dùng nhập đã nhập ảnh và quay lại sữa tên
    const fileInput = document.getElementById("hinhAnhInput");
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileType = file.type.split("/")[1];
        let updatedFile = new File([file], `${values}.${fileType}`, {
          type: file.type,
        });
        form.setFieldsValue({
          hinhAnh: updatedFile,
        });
        setHinhAnh(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Cập nhật giá trị của trường ngayTao
  const onChange = (date, dateString) => {
    form.setFieldsValue({
      ngayTao: dateString,
    });
  };
  // Thêm khóa hoc
  const handleAdd = (values) => {
    console.log("🙂 ~ handleAdd ~ values:", values);
    // Xử lý tên khóa học
    let acceptedExtensions = ["jpg", "jpeg", "png", "gif"];
    let nameCourse = values.hinhAnh.name;
    acceptedExtensions.forEach((extension) => {
      nameCourse = nameCourse.replace(new RegExp(`\\.${extension}$`, "ig"), "");
    });
    nameCourse = nameCourse
      .replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, " ")
      .replace(/\s+/g, " ") // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng duy nhất
      .replace(/\b\w/g, (match) => match.toUpperCase())
      .trim();
    console.log("🙂 ~ handleAdd ~ nameCourse:", nameCourse);

    // Form upload
    const formData = new FormData();
    formData.append("maKhoaHoc", values.maKhoaHoc);
    formData.append("biDanh", values.biDanh);
    formData.append("moTa", values.moTa);
    formData.append("luotXem", values.luotXem);
    formData.append("danhGia", values.danhGia);
    formData.append("maNhom", user.maNhom);
    formData.append("ngayTao", values.ngayTao);
    formData.append("maDanhMucKhoaHoc", values.maDanhMucKhoaHoc);
    formData.append("taiKhoanNguoiTao", user.taiKhoan);
    formData.append("tenKhoaHoc", nameCourse);
    formData.append("file", values.hinhAnh, values.hinhAnh.name);
    // Dữ liệu thêm khóa học
    const modifiedValues = {
      ...values,
      tenKhoaHoc: nameCourse,
      maNhom: user.maNhom,
      hinhAnh: values.hinhAnh.name,
      taiKhoanNguoiTao: user.taiKhoan,
      formUpload: formData,
    };
    console.log("🙂 ~ handleAdd ~ modifiedValues:", modifiedValues);

    dispatch(addCourseNew(modifiedValues));
  };
  // Kiểm tra và thông báo định dạng date
  const validateDate = (_, value) => {
    if (!moment(value, "DD/MM/YYYY", true).isValid()) {
      return Promise.reject(
        "Please enter a valid date in the format DD/MM/YYYY"
      );
    }
    return Promise.resolve();
  };
  const handleNavigation = () => {
    navigate("/managerCourse");
  };
  return (
    <div className="p-10">
      <Breadcrumb
        items={[
          {
            title: <a onClick={handleNavigation}>Manager course</a>,
          },
          {
            title: "Add course",
          },
        ]}
      />
      <div className="p-5">
        <Form onFinish={handleAdd} form={form}>
          <div className="grid grid-cols-2 space-x-5 justify-center items-center ">
            {/* mã khóa học */}
            <Form.Item
              name="maKhoaHoc"
              label="ID course"
              rules={[
                {
                  required: true,
                  message: "Please input your ID course!",
                },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message:
                    "ID course should not contain spaces or special characters!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* tên khóa học */}
            <Form.Item
              name="tenKhoaHoc"
              label="Name course"
              rules={[
                {
                  required: true,
                  message: "Please input your Name course!",
                },
                {
                  pattern: /^[a-zA-Z0-9]{3,}(?:\s[a-zA-Z0-9]+)*$/,
                  message: "Cannot include special characters",
                },
              ]}
            >
              <Input onChange={nameCourse} disabled={false} />
            </Form.Item>
            {/* bí danh */}
            <Form.Item
              name="biDanh"
              label="Alias"
              rules={[
                {
                  required: true,
                  message: "Please input your Alias!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* Lượt xem */}
            <Form.Item name="luotXem" label="View">
              <Input type="number" />
            </Form.Item>
            {/* đánh giá */}
            <Form.Item name="danhGia" label="Review">
              <Input type="number" />
            </Form.Item>
            {/* mã danh mục */}
            <Form.Item
              name="maDanhMucKhoaHoc"
              label="ID category"
              rules={[
                {
                  required: true,
                  message: "Please select ID category!",
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
            {/* ngày tạo */}
            <Form.Item
              name="ngayTao"
              label="Date"
              rules={[
                {
                  required: true,
                  message: "Please input your Date!",
                },
                {
                  validator: validateDate,
                },
              ]}
            >
              <Space direction="vertical">
                <DatePicker onChange={onChange} format="DD/MM/YYYY" />
              </Space>
            </Form.Item>
          </div>
          <div className="grid grid-cols-4 space-x-5">
            {/* hình ảnh */}
            <Form.Item
              name="hinhAnh"
              label="Image"
              rules={[
                {
                  required: true,
                  message: "Please input your ID course!",
                },
              ]}
            >
              <input
                id="hinhAnhInput"
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif"
                className="p-0"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const fileType = file.type.split("/")[1];
                    // Tạo một đối tượng mới với thuộc tính 'name' được cập nhật
                    let updatedFile = new File(
                      [file],
                      `${newFileName}.${fileType}`,
                      {
                        type: file.type,
                      }
                    );
                    // Sử dụng form.setFieldsValue để đặt giá trị cho trường hinhAnh
                    form.setFieldsValue({
                      hinhAnh: updatedFile,
                    });
                    setHinhAnh(e.target.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <div className="flex mb-2 ">
                <p className="m-0 font-semibold w-40 text-right pr-2"></p>
                {hinhAnh && (
                  <img
                    src={hinhAnh}
                    alt="..."
                    className="w-40 h-40 bg-gray-200"
                  />
                )}
              </div>
            </Form.Item>
            {/* mô tả */}
            <Form.Item
              name="moTa"
              label="Description"
              className="col-span-3"
              rules={[
                {
                  required: true,
                  message: "Please input your ID course!",
                },
              ]}
            >
              <TextArea rows={3} placeholder="Description course" />
            </Form.Item>
            {/* nút thêm */}
          </div>
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
    </div>
  );
}
