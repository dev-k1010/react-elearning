import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: JSON.parse(localStorage.getItem("USER_INFO")),
  detailUser: JSON.parse(localStorage.getItem("DETAIL_USER")),
  listUser: null,
  searchUser: null,
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
    setListUser: (state, action) => {
      state.listUser = action.payload;
    },
    setSearchUser: (state, action) => {
      state.searchUser = action.payload;
    },
  },
});
export default userSlice.reducer;
export let { setInfoUser, setDetailUser, setListUser, setSearchUser } =
  userSlice.actions;
