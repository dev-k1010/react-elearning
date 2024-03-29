import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
//
import userSlice from "./redux/User/userSlice";
import dataSlice from "./redux/User/dataSlice";
import thunk from "redux-thunk";
import Spinner from "./redux/Spinner/spinnerSlice";
import listUserSlice from "./redux/Admin/listUserSlice";
import listCourseSlice from "./redux/Admin/listCourseSlice";


const root = ReactDOM.createRoot(document.getElementById("root"));

let store = configureStore({
  reducer: {
    userSlice: userSlice,
    dataSlice: dataSlice,
    spinnerSlice: Spinner,
    listUserSlice: listUserSlice,
    listCourseSlice: listCourseSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
