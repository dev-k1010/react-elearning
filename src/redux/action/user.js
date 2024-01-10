import { message } from "antd";
import { https } from "../../service/config";
import { SET_INFO, SET_LOGIN } from "../constant/user";

export let loginAction = (values, navigate) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        console.log("🙂 ~ .then ~ res:", res)
        message.success("Đăng nhập thành công");
        let dataJson = JSON.stringify(res.data);
        localStorage.setItem("USER_INFO", dataJson);
        dispatch({
          type: SET_INFO,
          payload: res.data,
        });
        // navigate(-1);
      })
      .catch((err) => {
        message.error("Đăng nhập thất bại")
      });
  };
};
