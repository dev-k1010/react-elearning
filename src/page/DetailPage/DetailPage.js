import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import { message } from "antd";
import CardItem from "../../components/Card/CardItem";
import { useSelector } from "react-redux";

export default function DetailPage() {
  const { idDetail } = useParams();
  const [course, setCourse] = useState([]);
  const user = useSelector((state) => state.userSlice.user);
  const detailUser = useSelector((state) => state.userSlice.detailUser);

  useEffect(() => {
    https
      .get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${idDetail}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        message.error("Call API error", err);
      });
  }, [idDetail]);

  return (
    <div >
      <CardItem
        key={course.maKhoaHoc}
        course={course}
        isDetailpage={true}
        user={user}
        detailUser={detailUser}
      />
    </div>
  );
}
