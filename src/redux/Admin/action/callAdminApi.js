import { message } from "antd";
import { https } from "../../../service/config";
import { setListUserArr } from "../listUserSlice";
import {
  setCourseArr,
  setDetail,
  setListConfirm,
  setListPendingConfirm,
} from "../listCourseSlice";
//
// Quản lý User
//
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
        message.success("Delete user success");
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
        message.success("Add user success");
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
};
// Update User
export let updateUserAdmin = (values) => {
  return (dispatch) => {
    https
      .put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res.data);
        // message.success("Update success");
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        // message.err("Update error");
      });
  };
};
//
// Quản lý Course
//
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
// Thông tin khóa học
export let detailCourse = (values) => {
  return (dispatch) => {
    https
      .get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${values}`)
      .then((res) => {
        let detailJson = JSON.stringify(res.data);
        localStorage.setItem("DETAIL_COURSE", detailJson);
        dispatch(setDetail(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
};
// Thêm khóa học uploadHinhanh
export let addCourseImg = (values) => {
  console.log("🙂 ~ addCourseImg ~ values:", values);
  return (dispatch) => {
    https
      .post("/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
        message.success("add success");
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
};
// Sữa khóa học uploadHinhanh
export let updtaeCourseImg = (values) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload", values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res.data);
        message.success("add success");
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
};
// Thêm khóa học
export let addCourseNew = (values) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyKhoaHoc/ThemKhoaHoc", values)
      .then((res) => {
        message.success("Add success");
        https
          .post("/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", values.formUpload)
          .then((res) => {
            console.log("🙂 ~ .then ~ res:", res.data);
          })
          .catch((err) => {
            console.log("🙂 ~ return ~ err:", err);
          });
        window.location.href = "/managerCourse";
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
};
// Sữa khóa học
export let updateCourse = (values) => {
  console.log("🙂 ~ updateCourse ~ values:", values.formUpload);
  return (dispatch) => {
    https
      .put("api/QuanLyKhoaHoc/CapNhatKhoaHoc", values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res.data);
        message.success("Edit success");
        {
          values.formUpload &&
            https
              .post(
                "/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
                values.formUpload
              )
              .then((res) => {
                console.log("🙂 ~ .then ~ res:", res.data);
              })
              .catch((err) => {
                console.log("🙂 ~ return ~ err:", err);
              });
        }
        window.location.href = "/managerCourse";
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
        message.error(err.response.data);
      });
  };
};
// Tìm kiếm khóa học
export let searchCourse = (values) => {
  return (dispatch) => {
    https(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${values}`)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
        dispatch(setCourseArr(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
// Danh sách user chờ xác nhận
export let listConfirm = (values) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", values)
      .then((res) => {
        dispatch(setListPendingConfirm(res.data));
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
// Xác nhận user ghi danh
export let registerCourse = (maKhoaHoc, taiKhoan) => {
  return (dispatch) => {
    https
      .post("api/QuanLyKhoaHoc/GhiDanhKhoaHoc", {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
};
// Danh sách User đã xác nhận
export let listUserConfirm = (maKhoaHoc) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", maKhoaHoc)
      .then((res) => {
        dispatch(setListConfirm(res.data));
      })
      .catch((err) => {});
  };
};
// Hủy ghi danh
export let cancelCourse = (maKhoaHoc, taiKhoan) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyKhoaHoc/HuyGhiDanh", {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      })
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res);
      })
      .catch((err) => {
        console.log("🙂 ~ return ~ err:", err);
      });
  };
};
