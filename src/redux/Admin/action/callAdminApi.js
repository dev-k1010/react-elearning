import { message } from "antd";
import { https } from "../../../service/config";
import { setListUserArr } from "../listUserSlice";
import { setWaitList } from "../listCourseSlice";
//
// Quản lý User
// Danh sách User
export let userArr = (values) => {
  return (dispatch) => {
    https(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${
        values ? values : "GP09"
      }`
    )
      .then((res) => {
        dispatch(setListUserArr(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ listUser ~ err:", err);
      });
  };
};
// Xóa User
export let deleteUser = (values) => {
  return (dispatch) => {
    https
      .delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${values}`)
      .then((res) => {
        message.success("Xóa thành công");
        dispatch(userArr());
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
};
// Thêm User
export let addUserAdmin = (values) => {
  return (dispatch) => {
    https
      .post("api/QuanLyNguoiDung/ThemNguoiDung", values)
      .then((res) => {
        message.success("Thêm thành công");
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);

        message.error(err.response.data);
      });
  };
};
// Update User
export let updateUserAdmin = (values) => {
  console.log("🙂 ~ updateUserAdmin ~ values:", values);
  return (dispatch) => {
    https
      .put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values)
      .then((res) => {
        message.success("Update success");
      })
      .catch((err) => {
        message.err("Update error");
      });
  };
};
//
// Quản lý Course
//
// Danh sách khóa học chờ xét duyệt
export let waitListCourseRegister = (values) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
        dispatch(setWaitList(res.data));
      })
      .catch((err) => {});
  };
};
// Xóa khóa học
export let deleteCourse = (values) => {
  return (dispatch) => {
    https
      .delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${values}`)
      .then((res) => {
        message.success("Delete success");
        window.location.reload();
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };
};
export let addCourse = (values) => {
  console.log("🙂 ~ addCourse ~ values:", values);
  return (dispatch) => {
    https
      .post("/api/QuanLyKhoaHoc/ThemKhoaHoc", values)
      .then((res) => {
        message.success("add success");
        window.location.href = "/managerCourse";
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };
};
