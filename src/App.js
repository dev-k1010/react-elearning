import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage/LoginPage";
import HomePlayout from "./playout/HomePlayout";
import HomePage from "./page/HomePage/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<HomePlayout/>}>
          <Route path="/" element={<HomePage/>}/>
         </Route>
         

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
