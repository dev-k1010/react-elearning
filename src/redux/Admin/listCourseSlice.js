import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  courseArr: null,
  waitListCouse: null,
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
  },
});

export default listCourseSlice.reducer;
export let { setCourseArr, setWaitList } = listCourseSlice.actions;
