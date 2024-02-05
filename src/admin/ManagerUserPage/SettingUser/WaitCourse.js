import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { useDispatch } from "react-redux";
import { cancelCourse } from "../../../redux/User/action/callApi";

export default function WaitCourse({ courseArr, user }) {
  const dispatch = useDispatch();
  const [confirmCourse, setConfirmCourse] = useState([]);
  console.log("🙂 ~ WaitCourse ~ confirmCourse:", confirmCourse);
  useEffect(() => {
    confirm(user);
  }, [user]);
  // Ghi danh
  const registerCourse = (maKhoaHoc, taiKhoan) => {
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
  // Đã xét duyệt
  const confirm = (taiKhoan) => {
    https
      .post("api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", taiKhoan)
      .then((res) => {
        setConfirmCourse(res.data);
      })
      .catch((err) => {
        console.log("🙂 ~ confirm ~ err:", err);
      });
  };
  const handleConfirm = (values) => {
    registerCourse(values, user.taiKhoan);
  };
  const handleCancelConfirm = (values) => {
    console.log("🙂 ~ handleCancelConfirm ~ values:", values);
    dispatch(cancelCourse(values, user.taiKhoan));
    window.location.reload();
  };
  const columnsWait = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Course",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ID",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, course) => (
        <>
          <Button
            onClick={() => handleConfirm(course.maKhoaHoc)}
            className="bg-red-500 px-2"
            size="middle"
          >
            <a>Confirm</a>
          </Button>

          <Button
            onClick={() => handleCancelConfirm(course.maKhoaHoc)}
            className="bg-blue-500 px-2"
            size="middle"
          >
            <a>Cancel</a>
          </Button>
        </>
      ),
    },
  ];
  const columnsConfirm = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Course",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ID",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, course) => (
        <>
          <Button
            onClick={() => handleCancelConfirm(course.maKhoaHoc)}
            className="bg-blue-500 px-2"
            size="middle"
          >
            <a>Cancel</a>
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className=" ">
      <div className="text-xl text-color4 py-5">Course Wait Confirm</div>
      <Table columns={columnsWait} dataSource={courseArr} />
      <div className="text-xl text-color4 py-5">Confirm</div>
      <Table columns={columnsConfirm} dataSource={confirmCourse} />
    </div>
  );
}
