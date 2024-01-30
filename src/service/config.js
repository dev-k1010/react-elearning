import axios from "axios";

let TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NCIsIkhldEhhblN0cmluZyI6IjIyLzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjMzNjAwMDAwMCIsIm5iZiI6MTY4NzcxMjQwMCwiZXhwIjoxNzE2NDgzNjAwfQ.argi0m1LRAePDxZ6Nb4AX25fZ9gclDCUAA5oW84-TsQ";
// Tạo axios mới , gắn sẵn headers và base url ~ axios instance
export let https = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn",
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    TokenCybersoft: TOKEN,
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("USER_INFO"))?.accessToken,
  },
});
// Design TuDuy DiDong
