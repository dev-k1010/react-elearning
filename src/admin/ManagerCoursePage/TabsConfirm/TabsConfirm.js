import { Button, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelCourse } from "../../../redux/Admin/action/callAdminApi";

export default function TabsConfirm({ idCourse }) {
  const dispatch = useDispatch();
  const listUserConfirm = useSelector(
    (state) => state.listCourseSlice.listConfirm
  );

  const handleCancelConfirm = (taiKhoan) => {
    dispatch(cancelCourse(idCourse, taiKhoan));
    window.location.reload();
  };
  const columns = [
    {
      title: "Username",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text !== undefined ? text : ""}</a>,
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      key: "hoTen",
      render: (text) => <a>{text !== undefined ? text : ""}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, listUserConfirm) => (
        <>
          <Button
            onClick={() => handleCancelConfirm(listUserConfirm.taiKhoan)}
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
    <div >
      <span>List of confirmed</span>
      <Table columns={columns} dataSource={listUserConfirm} />
    </div>
  );
}
