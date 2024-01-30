import { message } from "antd";
import { https } from "../../../service/config";
import {
  setCategoryCourse,
  setCourseByCategory,
  setListCourse,
} from "../dataSlice";
import {
  setDetailUser,
  setInfoUser,
  setInfoUserCourse,
  setListUser,
} from "../userSlice";
import { setSpinner } from "../../Spinner/spinnerSlice";

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
export let callCourseByCategory = (valueSearch, values) => {
  return (dispatch) => {
    https(
      `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${valueSearch}&MaNhom=${
        values ? values : "GP09"
      }`
    )
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res)
        dispatch(setCourseByCategory(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err)
        
      });
  };
};
export let loginAction = (values) => {
  return (dispatch) => {
    dispatch(setSpinner(true));
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        let dataJson = JSON.stringify(res.data);
        localStorage.setItem("USER_INFO", dataJson);
        dispatch(setInfoUser(res.data));

        dispatch(setSpinner(false));
      })
      .catch((err) => {
        dispatch(setSpinner(false));

        message.error("Đăng nhập thất bại");
      });
  };
};
export let infoDetailUser = (values) => {
  return (dispatch) => {
    dispatch(setSpinner(true));

    https
      .post("/api/QuanLyNguoiDung/ThongTinTaiKhoan", values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
        localStorage.setItem("DETAIL_USER", JSON.stringify(res.data));
        dispatch(setDetailUser(res.data));

        dispatch(setSpinner(false));

        window.location.href = `/account/${values.taiKhoan}`;
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);

        dispatch(setSpinner(false));
      });
  };
};
export let updateUser = (values) => {
  return (dispatch) => {
    https
      .put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values)
      .then((res) => {
        localStorage.setItem("DETAIL_USER", JSON.stringify(res.data));
        dispatch(setDetailUser(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err.data);
      });
  };
};
export let listUser = (values) => {
  return (dispatch) => {
    https(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${values}`)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res.data);
        dispatch(setListUser(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ listUser ~ err:", err);
      });
  };
};
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
export let signUpCourse = (valuesCourse, valuesUser) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", {
        maKhoaHoc: valuesCourse,
        taiKhoan: valuesUser,
      })
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
export let infoUserCourse = (values) => {
  return (dispatch) => {
    https(`/api/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${values}`)
      .then((res) => {
        console.log("🙂 ~ https ~ res:", res.data.lstHocVien);
        dispatch(setInfoUserCourse(res.data.lstHocVien));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
