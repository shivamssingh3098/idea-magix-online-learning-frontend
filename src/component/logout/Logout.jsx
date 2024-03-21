import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "../resusableComponents/AdminContext";
const Logout = (props) => {
  const { setIsAuthenticated } = useContext(AdminDataContext);
  const navigate = useNavigate();
  const logout = async () => {
    await axios.post("/api/v1/admin/logout");

    setIsAuthenticated(false);
    localStorage.removeItem("loginType");
    return navigate("/login");
  };
  useEffect(() => {
    logout();
  }, []);
};

export default Logout;
