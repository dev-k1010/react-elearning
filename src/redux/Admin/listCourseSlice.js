import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  courseArr: null,
  waitListCouse: null,
  listPendingConfirm: null,
  listConfirm: null,
  detail: JSON.parse(localStorage.getItem("DETAIL_COURSE")),
};

let listCourseSlice = createSlice({
  name: "dataCourseSlice",
  initialState,
  reducers: {
    setCourseArr: (state, action) => {
      state.courseArr = action.payload;
    },
    setWaitList: (state, action) => {
      state.waitListCouse = action.payload;
    },
    setListPendingConfirm: (state, action) => {
      state.listPendingConfirm = action.payload;
    },
    setListConfirm: (state, action) => {
      state.listConfirm = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export default listCourseSlice.reducer;
export let {
  setCourseArr,
  setWaitList,
  setDetail,
  setListPendingConfirm,
  setListConfirm,
} = listCourseSlice.actions;
