import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage/LoginPage";
import HomePlayout from "./playout/HomePlayout";
import HomePage from "./page/HomePage/HomePage";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import Spinner from "./components/Spinner/Spinner";
import AccountPage from "./page/User/AccountPage";
import SignUpPage from "./page/LoginPage/SignUpPage";
import DetailPage from "./page/DetailPage/DetailPage";
import ManagerUserPage from "./admin/ManagerUserPage/ManagerUserPage";
import ManagerCoursePage from "./admin/ManagerCoursePage/ManagerCoursePage";
import AddUser from "./admin/ManagerUserPage/AddUser/AddUser";
import EditUser from "./admin/ManagerUserPage/EditUser/EditUser";
import AddCourse from "./admin/ManagerCoursePage/AddCourse/AddCourse";
import EditCourse from "./admin/ManagerCoursePage/EditCourse/EditCourse";

function App() {
  return (
    <div>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePlayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:idCourse" element={<CategoryPage />} />
            <Route path="/account/:userName" element={<AccountPage />} />
            <Route path="/detail/:idDetail" element={<DetailPage />} />
            {/* Manager User */}
            <Route path="/managerUser" element={<ManagerUserPage />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/edit/:idUser" element={<EditUser />} />
            {/* Manager Course */}
            <Route path="/managerCourse" element={<ManagerCoursePage />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/settingCourse/:idCourse" element={<EditCourse />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
