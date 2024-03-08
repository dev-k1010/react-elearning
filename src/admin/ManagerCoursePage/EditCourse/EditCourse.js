import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tabs,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { updateCourse } from "../../../redux/Admin/action/callAdminApi";
import moment from "moment";

export default function EditCourse() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.userSlice.user);
  const listCourseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const listCategoryArr = useSelector(
    (state) => state.dataSlice.categoryCourse
  );
  const detail = useSelector((state) => state.listCourseSlice.detail);
  console.log("🙂 ~ EditCourse ~ detail:", detail);
  const [imgCourse, setImgCourse] = useState();

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        maKhoaHoc: detail.maKhoaHoc ? detail.maKhoaHoc : "",
        biDanh: detail.biDanh ? detail.biDanh : "",
        tenKhoaHoc: detail.tenKhoaHoc ? detail.tenKhoaHoc : "",
        moTa: detail.moTa ? detail.moTa : "",
        luotXem: detail.luotXem ? detail.luotXem : 0,
        danhGia: detail.danhGia ? detail.danhGia : 0,
        maNhom: detail.maNhom ? detail.maNhom : "",
        ngayTao: moment(),
        maDanhMucKhoaHoc: detail.danhMucKhoaHoc.maDanhMucKhoahoc
          ? detail.danhMucKhoaHoc.maDanhMucKhoahoc
          : "",
        taiKhoanNguoiTao: detail.nguoiTao.taiKhoan
          ? detail.nguoiTao.taiKhoan
          : "",
      });
      // setImgCourse(detail.hinhAnh);
    }
  }, [detail, form]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("DETAIL_COURSE");
    };
    // Đăng ký sự kiện beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const onChange = (date, dateString) => {
    form.setFieldsValue({
      ngayTao: dateString,
    });
  };

  const handleEdit = (values) => {
    // Kiểm tra nếu ngayTao là một đối tượng moment
    let formattedDate;
    if (moment.isMoment(values.ngayTao)) {
      formattedDate = values.ngayTao.format("DD/MM/YYYY");
    } else {
      formattedDate = values.ngayTao;
    }
    // Xử lý tên khóa học
    let acceptedExtensions = ["jpg", "jpeg", "png", "gif"];
    let nameCourse = values.hinhAnh ? values.hinhAnh.name : detail.tenKhoaHoc;
    if (nameCourse) {
      acceptedExtensions.forEach((extension) => {
        nameCourse = nameCourse.replace(
          new RegExp(`\\.${extension}$`, "ig"),
          ""
        );
      });
    }
    nameCourse = nameCourse
      .replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, " ")
      .replace(/\s+/g, " ") // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng duy nhất
      .replace(/\b\w/g, (match) => match.toUpperCase())
      .trim();

    const formData = new FormData();
    formData.append("maKhoaHoc", values.maKhoaHoc);
    formData.append("biDanh", values.biDanh);
    formData.append("moTa", values.moTa);
    formData.append("luotXem", values.luotXem);
    formData.append("danhGia", values.danhGia);
    formData.append("maNhom", user.maNhom);
    formData.append("ngayTao", formattedDate);
    formData.append("maDanhMucKhoaHoc", values.maDanhMucKhoaHoc);
    formData.append("taiKhoanNguoiTao", user.taiKhoan);
    formData.append("tenKhoaHoc", nameCourse);
    if (values.hinhAnh) {
      formData.append("file", values.hinhAnh, values.hinhAnh.name);
    }

    const modifiedValues = {
      ...values,
      ngayTao: formattedDate,
      tenKhoaHoc: nameCourse,
      maNhom: user.maNhom,
      hinhAnh: values.hinhAnh ? values.hinhAnh.name : detail.hinhAnh,
      taiKhoanNguoiTao: user.taiKhoan,
      formUpload: values.hinhAnh ? formData : null,
    };
    console.log("🙂 ~ handleEdit ~ modifiedValues:", modifiedValues);

    const isNameDuplicate = listCourseArr
      .filter((course) => course.tenKhoaHoc != detail.tenKhoaHoc)
      .some((course) => course.tenKhoaHoc === nameCourse);

    // Kiểm tra khi người dùng chọn ảnh mới
    if (isNameDuplicate) {
      Modal.error({
        title: "Registered Course",
        content: (
          <div>
            <p>Image already exists!</p>
          </div>
        ),
        okButtonProps: {
          className: "bg-red-500 text-white",
        },
      });
    } else {
      dispatch(updateCourse(modifiedValues));
    }
  };

  const optionsCategory = listCategoryArr.map((name, index) => ({
    key: index,
    value: name.maDanhMuc,
    label: name.maDanhMuc,
  }));
  const items = [
    {
      key: "1",
      label: "Info User",
      children: (
        <Form
          onFinish={handleEdit}
          form={form}
          className="grid grid-cols-2 space-x-5 p-20"
        >
          {/* mã khóa học */}
          <Form.Item name="maKhoaHoc" label="ID course">
            <Input disabled={true} />
          </Form.Item>
          {/* tài khoản người tạo */}
          <Form.Item name="taiKhoanNguoiTao" label="User create">
            <Input disabled={true} />
          </Form.Item>
          {/* tên khóa học */}
          <Form.Item name="tenKhoaHoc" label="Name course">
            <Input disabled={false} />
          </Form.Item>
          {/* lượt xem */}
          <Form.Item name="luotXem" label="View">
            <Input type="number" />
          </Form.Item>
          {/* đánh giá*/}
          <Form.Item name="danhGia" label="Review">
            <Input type="number" />
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
          {/* mã nhóm */}
          <Form.Item name="maNhom" label="ID Group">
            <Input disabled={true} />
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
          {/* Ngày tạo */}
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
              <DatePicker
                onChange={onChange}
                defaultValue={
                  dayjs(detail?.ngayTao, "DD/MM/YYYY").isValid()
                    ? dayjs(detail.ngayTao, "DD/MM/YYYY")
                    : undefined
                }
                format="DD/MM/YYYY"
              />
            </Space>
          </Form.Item>
          {/* Mô tả */}
          <Form.Item name="moTa" label="Description">
            <TextArea rows={4} placeholder="Description course" />
          </Form.Item>
          {/* hình ảnh */}
          <Form.Item name="hinhAnh" label="Image">
            <input
              id="hinhAnhInput"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              className="p-0"
              onChange={(e) => {
                const file = e.target.files[0];

                // Kiểm tra nếu file tồn tại
                if (file) {
                  const reader = new FileReader();

                  reader.onload = (e) => {
                    // Sử dụng form.setFieldsValue để đặt giá trị cho trường hinhAnh
                    form.setFieldsValue({
                      hinhAnh: file,
                    });
                    setImgCourse(e.target.result);
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
            <div className="flex mb-2">
              <p className="m-0 font-semibold w-40 text-right pr-2"></p>

              <img
                src={imgCourse ? imgCourse : detail.hinhAnh || ""}
                alt="..."
                className="w-40 h-40 bg-gray-200"
              />
            </div>
          </Form.Item>
          {/* Button */}
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
              Edit course
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];
  return (
    <div>
      <div>
        <Tabs
          className="mx-2 md:mx-10 lg:mx-40"
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
}
// Edit-version1
