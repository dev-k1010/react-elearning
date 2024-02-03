import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage/LoginPage";
import HomePlayout from "./playout/HomePlayout";
import HomePage from "./page/HomePage/HomePage";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import SearchPage from "./page/SearchPage/SearchPage";
import Spinner from "./components/Spinner/Spinner";
import AccountPage from "./page/User/AccountPage";
import SignUpPage from "./page/LoginPage/SignUpPage";
import DetailPage from "./page/DetailPage/DetailPage";

function App() {
  return (
    <div>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePlayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:idCourse" element={<CategoryPage />} />
            <Route path="/searchCourse/:searchName" element={<SearchPage />} />
            <Route path="/account/:userName" element={<AccountPage />} />
            <Route path="/detail/:idDetail" element={<DetailPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
