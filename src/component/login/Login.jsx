import React, { useContext, useState } from "react";

import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "../resusableComponents/AdminContext";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../../firebase";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Login = ({}) => {
  const { setIsAuthenticated } = useContext(AdminDataContext);
  const [loginType, setLoginType] = useState("");
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginType(event.target.value);
  };

  const navigate = useNavigate();
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    console.log(userDetails);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let res;
      if (loginType === "admin") {
        res = await axios.post(`/api/v1/admin/login`, {
          ...userDetails,
        });
        setIsAuthenticated(true);
        localStorage.setItem("loginType", "admin");
      } else {
        res = await axios.post(`/api/v1/instructor/login`, {
          ...userDetails,
        });
        setIsAuthenticated(true);
        localStorage.setItem("loginType", "instructor");
      }

      console.log("token created", res);
      console.log("Login ress", res);

      setUserDetails({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      //   alert("Invalid credentials");
      navigate("/login");
      console.log(error);
    }
  };

  const addressTxt = {
    width: { xs: "100%", sm: "80%" },

    borderRadius: "10px",
    color: "rgba(255, 255, 255, 0.96)",
    border: "1px solid black",
    "& fieldset": {
      border: "none",
      color: "rgba(255, 255, 255, 0.96);",
    },
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            //   flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize="16px"
                    sx={{ color: "grey.main" }}
                  >
                    Enter Email
                  </Typography>

                  <TextField
                    name="email"
                    value={userDetails.email}
                    //  defaultValue={restaurantDetails.bankDetail.bankName}

                    onChange={(e) => onChange(e)}
                    size="small"
                    required
                    sx={addressTxt}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize="16px"
                    sx={{ color: "grey.main", mt: 2 }}
                  >
                    Password*
                  </Typography>

                  <TextField
                    name="password"
                    value={userDetails.password}
                    // defaultValue={restaurantDetails.bankDetail.accountNumber}
                    onChange={(e) => onChange(e)}
                    size="small"
                    type="password"
                    required
                    sx={addressTxt}
                  />
                  <br />

                  <FormControl fullWidth>
                    <InputLabel id="login-type-label">
                      Select Login Type
                    </InputLabel>
                    <Select
                      labelId="login-type-label"
                      id="login-type"
                      value={loginType}
                      label="Select Login Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="instructor">Instructor</MenuItem>
                    </Select>
                  </FormControl>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: { xs: "center" },
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 4,
                        background: `linear-gradient(180deg, #FF9B25 0%, rgba(189, 50, 20, 0.76) 100%)`,
                        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.25)",
                        color: "white.main",
                        me: 5,
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
