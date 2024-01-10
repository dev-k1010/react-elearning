import { SET_INFO, SET_LOGIN } from "../constant/user";

let intialState = {
  user: JSON.parse(localStorage.getItem("USER_INFO")),
};
export let userReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_INFO: {
      state.user = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
