import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: JSON.parse(localStorage.getItem("USER_INFO")) || {},
  detailUser: JSON.parse(localStorage.getItem("DETAIL_USER")) || {},
  infoUserCourse:[],
  listUser: [],

};

let userSlice = createSlice({
  name: "userSLice",
  initialState,
  reducers: {
    setInfoUser: (state, action) => {
      state.user = action.payload;
    },
    setDetailUser: (state, action) => {
      state.detailUser = action.payload;
    },
    setInfoUserCourse: (state, action) => {
      state.infoUserCourse = action.payload;
    },
    setListUser: (state, action) => {
      state.listUser = action.payload;
    },
  },
});
export default userSlice.reducer;
export let {
  setInfoUser,
  setDetailUser,
  setInfoUserCourse,
  setListUser,
} = userSlice.actions;
