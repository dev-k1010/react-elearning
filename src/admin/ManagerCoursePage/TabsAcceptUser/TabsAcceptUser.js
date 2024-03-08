import { Button, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelCourse,
  registerCourse,
} from "../../../redux/Admin/action/callAdminApi";

export default function TabsAcceptUser({ idCourse }) {
  const dispatch = useDispatch();
  const listUser = useSelector(
    (state) => state.listCourseSlice.listPendingConfirm
  );
  const handleConfirm = (taiKhoan) => {
    dispatch(registerCourse(idCourse, taiKhoan));
  };
  const handleCancelConfirm = (taiKhoan) => {
    dispatch(cancelCourse(idCourse, taiKhoan));
    window.location.reload();
  };
  const columns = [
    {
      title: "Username",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      key: "hoTen",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, listUser) => (
        <>
          <Button
            onClick={() => handleConfirm(listUser.taiKhoan)}
            className="bg-blue-500 px-2"
            size="middle"
          >
            <a>Confirm</a>
          </Button>

          <Button
            onClick={() => handleCancelConfirm(listUser.taiKhoan)}
            className="bg-red-500 px-2"
            size="middle"
          >
            <a>Cancel</a>
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <span>List of pending confirmations</span>
      <Table columns={columns} dataSource={listUser} />
    </div>
  );
}
