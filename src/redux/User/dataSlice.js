import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  listCourseArr: [],
  categoryCourse: [],
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
    setCourseByCategory: (state, action) => {
      state.courseByCategory = action.payload;
    },
  },
});
export default dataSlice.reducer;
export let { setListCourse, setCategoryCourse, setCourseByCategory } =
  dataSlice.actions;
