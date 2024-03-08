import {
  Breadcrumb,
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
import { useNavigate } from "react-router-dom";

export default function EditCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const detail = useSelector((state) => state.listCourseSlice.detail);
  const user = useSelector((state) => state.userSlice.user);
  const listCourseArr = useSelector((state) => state.dataSlice.listCourseArr);
  const listCategoryArr = useSelector(
    (state) => state.dataSlice.categoryCourse
  );
  const [imgCourse, setImgCourse] = useState();
  const [tenKhoaHocHienTai, setTenKhoaHocHienTai] = useState();
  const [tenAnhMoi, setTenAnhMoi] = useState();
  // TH3-4
  // const [hinhAnh, setHinhAnh] = useState();
  const [newFileName, setNewFileName] = useState();
  console.log("🙂 ~ EditCourse ~ newFileName:", newFileName);

  const chuyenThanhChuoiThuong = (name) => {
    return name
      .toLowerCase() // Chuyển đổi thành chữ thường
      .replace(/[^a-z0-9]/g, ""); // Loại bỏ các ký tự không phải là chữ và số
  };
  useEffect(() => {
    setTenKhoaHocHienTai(chuyenThanhChuoiThuong(detail.tenKhoaHoc));
  }, []);
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
    // console.log("🙂 ~ nameCourse ~ fileInput:", fileInput.files.length);
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
        setImgCourse(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    // if(fileInput.files.length = 0){

    // }
  };

  // Định dạng ngày tạo
  const onChange = (date, dateString) => {
    form.setFieldsValue({
      ngayTao: dateString,
    });
  };
  // TH1: Ảnh không đổi - tên không đổi
  const truongHopMot = (values) => {
    // Kiểm tra nếu ngayTao là một đối tượng moment
    let formattedDate;
    if (moment.isMoment(values.ngayTao)) {
      formattedDate = values.ngayTao.format("DD/MM/YYYY");
    } else {
      formattedDate = values.ngayTao;
    }
    // Xử lý tên khóa học
    let acceptedExtensions = ["jpg", "jpeg", "png", "gif"];
    let nameCourse = detail.tenKhoaHoc;
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

    const modifiedValues = {
      ...values,
      ngayTao: formattedDate,
      tenKhoaHoc: values.tenKhoaHoc,
      maNhom: user.maNhom,
      hinhAnh: detail.hinhAnh,
      taiKhoanNguoiTao: user.taiKhoan,
      formUpload: null,
    };
    return modifiedValues;
  };
  // TH2: Ảnh đổi - tên không đổi
  const truongHopHai = (values) => {
    // Lấy tên khóa học và định dạng nó
    let doiTenAnh = values.tenKhoaHoc;
    doiTenAnh = doiTenAnh
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    // Lấy tệp đã chọn
    const fileHinhAnh = values.hinhAnh;

    // Tạo một địa chỉ URL cho tệp
    const fileObjectURL = URL.createObjectURL(fileHinhAnh);

    // Trích xuất loại tệp
    const fileType = fileHinhAnh.type.split("/")[1];

    // Tạo một tệp đã cập nhật với tên đã định dạng
    const updatedFile = new File([fileHinhAnh], `${doiTenAnh}.${fileType}`, {
      type: fileHinhAnh.type,
    });

    // Kiểm tra nếu ngayTao là một đối tượng moment
    let formattedDate;
    if (moment.isMoment(values.ngayTao)) {
      formattedDate = values.ngayTao.format("DD/MM/YYYY");
    } else {
      formattedDate = values.ngayTao;
    }
    // Xử lý tên khóa học
    let acceptedExtensions = ["jpg", "jpeg", "png", "gif"];
    let nameCourse = updatedFile.name;
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
      .replace(/\s+/g, " ")
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
    formData.append("tenKhoaHoc", values.tenKhoaHoc);
    formData.append("file", updatedFile, updatedFile.name);

    const modifiedValues = {
      ...values,
      ngayTao: formattedDate,
      maNhom: user.maNhom,
      hinhAnh: updatedFile.name,
      taiKhoanNguoiTao: user.taiKhoan,
      formUpload: formData,
    };

    // Sử dụng phương thức URL.createObjectURL để tạo một địa chỉ URL cho tệp đã chọn
    URL.revokeObjectURL(fileObjectURL);
    return modifiedValues;
  };
  // TH3: Ảnh đổi - Tên đổi
  const truongHopBa = (values) => {
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
    return modifiedValues;
  };
  // TH4:Ảnh không đổi - tên đổi
  // const truongHopBon = (values) => {
  //   console.log("🙂 ~ truongHopBon ~ values:", values);
  //   // Kiểm tra nếu ngayTao là một đối tượng moment
  //   let formattedDate;
  //   if (moment.isMoment(values.ngayTao)) {
  //     formattedDate = values.ngayTao.format("DD/MM/YYYY");
  //   } else {
  //     formattedDate = values.ngayTao;
  //   }
  //   // Xử lý tên khóa học
  //   let acceptedExtensions = ["jpg", "jpeg", "png", "gif"];
  //   let nameCourse = detail.tenKhoaHoc;
  //   if (nameCourse) {
  //     acceptedExtensions.forEach((extension) => {
  //       nameCourse = nameCourse.replace(
  //         new RegExp(`\\.${extension}$`, "ig"),
  //         ""
  //       );
  //     });
  //   }
  //   nameCourse = nameCourse
  //     .replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, " ")
  //     .replace(/\s+/g, " ") // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng duy nhất
  //     .replace(/\b\w/g, (match) => match.toUpperCase())
  //     .trim();

  //   const modifiedValues = {
  //     ...values,
  //     ngayTao: formattedDate,
  //     tenKhoaHoc: values.tenKhoaHoc,
  //     maNhom: user.maNhom,
  //     hinhAnh: detail.hinhAnh,
  //     taiKhoanNguoiTao: user.taiKhoan,
  //     formUpload: null,
  //   };
  //   return modifiedValues;
  // };
  const truongHopBon = () => {
    Modal.error({
      title: "Registered Course",
      content: (
        <div>
          <p>Please select an image.</p>
        </div>
      ),
      okButtonProps: {
        className: "bg-red-500 text-white",
      },
    });
  };

  // CHỉnh sữa khóa học
  const handleEdit = (values) => {
    const tenAnhDetail = detail.hinhAnh.replace(
      "https://elearningnew.cybersoft.edu.vn/hinhanh/",
      ""
    );
    if (values.hinhAnh == undefined) {
      // TH1: Ảnh không đổi - tên không đổi
      if (values.tenKhoaHoc === detail.tenKhoaHoc) {
        const valuesThMot = truongHopMot(values);
        console.log("🙂 ~ handleEdit ~ valuesThMot:", valuesThMot);
        dispatch(updateCourse(valuesThMot));
      }
      // TH4: Ảnh không đổi - tên đổi
      if (values.tenKhoaHoc != detail.tenKhoaHoc) {
        const valuesThBon = truongHopBon();
        // console.log("🙂 ~ handleEdit ~ valuesThBon:", valuesThBon);
        // dispatch(updateCourse(valuesThBon));
      }
    } else {
      // TH2: Ảnh đổi - tên không đổi
      if (
        values.hinhAnh.name != tenAnhDetail &&
        values.tenKhoaHoc === detail.tenKhoaHoc
      ) {
        const valuesThHai = truongHopHai(values);
        console.log("🙂 ~ handleEdit ~ valuesThHai:", valuesThHai);
        dispatch(updateCourse(valuesThHai));
      }
      // TH3: Ảnh đổi - Tên đổi
      if (values.tenKhoaHoc != detail.tenKhoaHoc) {
        const valuesThBa = truongHopBa(values);
        console.log("🙂 ~ handleEdit ~ valuesThBa:", valuesThBa);
        dispatch(updateCourse(valuesThBa));
      }
    }
  };

  const optionsCategory = listCategoryArr.map((name, index) => ({
    key: index,
    value: name.maDanhMuc,
    label: name.maDanhMuc,
  }));
  // Chuyển trang
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
            title: "Edit course",
          },
        ]}
      />
      <div>
        <Form
          onFinish={handleEdit}
          form={form}
          className="grid grid-cols-2 space-x-5 p-5"
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

                let tenAnh = file.name;
                let tenAnhHienTai = detail.hinhAnh.replace(
                  "https://elearningnew.cybersoft.edu.vn/hinhanh/",
                  ""
                );

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
                    hinhAnh: newFileName ? updatedFile : file,
                  });
                  setImgCourse(e.target.result);
                };

                reader.readAsDataURL(file);
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
      </div>
    </div>
  );
}

