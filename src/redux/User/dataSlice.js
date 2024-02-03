import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  listCourseArr: [],
  categoryCourse: [],
  infoUserCourse: [],
  courseByCategory: [],
};
let dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setListCourse: (state, action) => {
      state.listCourseArr = action.payload;
    },
    setCategoryCourse: (state, action) => {
      state.categoryCourse = action.payload;
    },
    setInfoUserCourse: (state, action) => {
      state.infoUserCourse = action.payload;
    },
    setCourseByCategory: (state, action) => {
      state.courseByCategory = action.payload;
    },
  },
});
export default dataSlice.reducer;
export let {
  setListCourse,
  setCategoryCourse,
  setInfoUserCourse,
  setCourseByCategory,
} = dataSlice.actions;
