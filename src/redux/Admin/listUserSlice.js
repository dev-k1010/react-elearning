import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  listUserArr: [],
  
};
let listUserSlice = createSlice({
  name: "dataUserSlice",
  initialState,
  reducers: {
    setListUserArr: (state, action) => {
      state.listUserArr = action.payload;
    },
  
  },
});

export default listUserSlice.reducer;
export let { setListUserArr } = listUserSlice.actions;
