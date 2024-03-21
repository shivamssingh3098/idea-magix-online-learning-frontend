// import { Grid } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import "./App.css";

import Appbar from "./component/appBar/Appbar";
import Home from "./component/home/Home";
import Login from "./component/login/Login";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "./component/resusableComponents/AdminContext";
import { useContext, useEffect, useState } from "react";
import Logout from "./component/logout/Logout";
import AddCourse from "./component/addCourses/AddCourse";
import AssignCourse from "./component/assignCourse/AssignCourse";
import Lectures from "./component/lectures/Lectures";
import Course from "./component/lectures/Course";
import InstrructorCourse from "./component/instructor/InstrructorCourse";
import InstructorLogout from "./component/instructor/InstructorLogout";
function App() {
  const { isAuthenticated, setIsAuthenticated, loginType } =
    useContext(AdminDataContext);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedLoginType, setStoredLoginType] = useState(
    localStorage.getItem("loginType")
  );
  const currentUser = async (req, res) => {
    try {
      if (storedLoginType === "admin") {
        const user = await axios.get(`/api/v1/admin`);

        setIsAuthenticated(true);
        console.log("isLoggedIn", isLoggedIn);
        console.log("user", user);
      } else if (storedLoginType === "instructor") {
        const user = await axios.get(`/api/v1/instructor`);

        setIsAuthenticated(true);
        console.log("isLoggedIn", isLoggedIn);
        console.log("user", user);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      return navigate("/login");
    }
  };

  useEffect(() => {
    currentUser();
  }, []);
  console.log("storedLoginType inn app", storedLoginType);
  return (
    <>
      <Appbar />
      {isAuthenticated ? (
        <>
          {localStorage.getItem("loginType") === "admin" ? (
            <>
              {" "}
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />} />

                <Route path="/addcourses" element={<AddCourse />} />
                <Route path="/assigncourse" element={<AssignCourse />} />

                <Route path="/course" element={<Course />} />
                {/* <Route path="/course" element={<Lectures />} /> */}

                <Route path="/Logout" element={<Logout />} />
              </Routes>
            </>
          ) : localStorage.getItem("loginType") === "instructor" ? (
            <>
              <Routes>
                <Route path="/" element={<InstrructorCourse />}></Route>
                <Route path="/instructorhome" element={<InstrructorCourse />} />

                <Route
                  path="/instructorlogout"
                  element={<InstructorLogout />}
                />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />}></Route>

              {/* <Route path="/" element={<Home />}></Route> */}
            </Routes>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />}></Route>

          {/* <Route path="/" element={<Home />}></Route> */}
        </Routes>
      )}
    </>
  );
}

export default App;
