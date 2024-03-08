import { message } from "antd";
import { https } from "../../../service/config";
import {
  setCategoryCourse,
  setCourseByCategory,
  setInfoUserCourse,
  setListCourse,
} from "../dataSlice";
import {
  setDetailUser,
  setInfoUser,
  setListUser,
  setSearchUser,
} from "../userSlice";
import { setSpinner } from "../../Spinner/spinnerSlice";
//
// User
//
// Đăng nhập
export let loginAction = (values) => {
  return (dispatch) => {
    dispatch(setSpinner(true));
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        let dataJson = JSON.stringify(res.data);
        localStorage.setItem("USER_INFO", dataJson);
        dispatch(setInfoUser(res.data));
        window.location.href = "/";
        dispatch(setSpinner(false));
      })
      .catch((err) => {
        message.error(err.response.data);
        dispatch(setSpinner(false));
      });
  };
};
// Thông tin tài khoảng
export let infoDetailUser = (values) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyNguoiDung/ThongTinTaiKhoan", values)
      .then((res) => {
        dispatch(setDetailUser(res.data));
        localStorage.setItem("DETAIL_USER", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
// Cập nhật thông tin tài khoảng
export let updateUser = (values) => {
  return (dispatch) => {
    https
      .put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values)
      .then((res) => {
        localStorage.setItem("DETAIL_USER", JSON.stringify(res.data));
        dispatch(infoDetailUser(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err.data);
      });
  };
};
// Danh sách người dùng
export let listUser = (values) => {
  return (dispatch) => {
    https(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${
        values ? values : "GP09"
      }`
    )
      .then((res) => {
        dispatch(setListUser(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ listUser ~ err:", err);
      });
  };
};
// Thêm người dùng
export let addUser = (values) => {
  console.log("🙂 ~ addUser ~ values:", values);
  return (dispatch) => {
    https
      .post("/api/QuanLyNguoiDung/DangKy", values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};

//
// Data Course
//
// Danh sách người dùng đăng kí khóa học
export let infoUserCourse = (values) => {
  return async (dispatch) => {
    try {
      const response = await https(
        `/api/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${values}`
      );
      console.log("🙂 ~ https ~ res:", response.data.lstHocVien);
      dispatch(setInfoUserCourse(response.data.lstHocVien));
    } catch (error) {
      console.log("🙂 ~ return ~ err:", error);
    }
  };
};
// Danh sách khóa học
export let callListCourse = (values) => {
  return (dispatch) => {
    https(
      `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${values ? values : "GP09"}`
    )
      .then((res) => {
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        message.error("Call API error");
      });
  };
};
// Danh mục khóa học
export let callCategoryCourse = () => {
  return (dispatch) => {
    https("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
      .then((res) => {
        dispatch(setCategoryCourse(res.data));
      })
      .catch((err) => {
        message.error("Call API error");
      });
  };
};
// Các khóa học có trong danh mục
export let callCourseByCategory = (valueSearch, values) => {
  return (dispatch) => {
    https(
      `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${valueSearch}&MaNhom=${
        values ? values : "GP09"
      }`
    )
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
        dispatch(setCourseByCategory(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
// Đăng ký khóa học
export let signUpCourse = (valuesCourse, valuesUser) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", {
        maKhoaHoc: valuesCourse,
        taiKhoan: valuesUser,
      })
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res.data);
        dispatch(infoDetailUser(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
