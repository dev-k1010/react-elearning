import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  spinner: false,
};

let spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setSpinner: (state, action) => {
      state.spinner = action.payload;
    },
  },
});
export default spinnerSlice.reducer;
export let { setSpinner } = spinnerSlice.actions;
