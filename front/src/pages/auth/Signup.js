import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import {
  AuthButtonBox,
  AuthContainer,
  AuthImage,
  AuthInputBox,
  AuthLeftBox,
  CustomCheck,
  CustomFormControlLabel,
  ReferenceText,
} from "../../assets/styles/auth";
import {
  Avatar,
  Box,
  Button,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import authImg from "../../assets/images/AuthPageImage.svg";
import googleIcon from "../../assets/images/flat-color-icons_google.svg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tenantName, setCompany] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post("/auth/register", {
        username,
        password,
        tenantName,
      });
      // You can handle the successful signup here
      // For example, you can show a success message and navigate to the login page
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      // Handle signup error
      console.log(error.response.data);
    }
  };

  return (
    <>
      {/* <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Company:</label>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div> */}
      <AuthContainer>
        <Box className="child-1">
          <AuthLeftBox>
            <Typography variant="h1">Registrarse</Typography>
            <Stack gap={{s_xl:4, lg:3, xs:2}}>
              <AuthInputBox>
                <Typography variant="h6">Company</Typography>
                <InputBase
                  type="text"
                  placeholder="Company Name"
                  value={tenantName}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </AuthInputBox>
              <AuthInputBox>
                <Typography variant="h6">Email</Typography>
                <InputBase
                  type="text"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </AuthInputBox>
              <AuthInputBox>
                <Typography variant="h6">Contraseña</Typography>
                <InputBase
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </AuthInputBox>
            </Stack>
            <CustomFormControlLabel
              control={
                <CustomCheck defaultChecked disableRipple disableTouchRipple />
              }
              label="Estoy de acuerdo con los terminos y condiciones"
            />
            <AuthButtonBox>
              <Button variant="contained" color="violet" onClick={handleSubmit}>
                Registrate con tu Email
              </Button>
              <Button
                variant="outlined"
                color="white"
                startIcon={
                  <Avatar
                    src={googleIcon}
                    sx={{ width: "auto", height: "auto" }}
                  />
                }
              >
                Registrate con Google
              </Button>
            </AuthButtonBox>
            <ReferenceText>
              ¿Ya tienes una cuenta? <Link to="/login">Log In</Link>
            </ReferenceText>
          </AuthLeftBox>
        </Box>
        <Box className="child-2">
          <Typography variant="h3">IT</Typography>
          <Box>
            <AuthImage src={authImg} className="authImg" />
            <Typography variant="h4">
              Una sola herramienta para poder cumplir todas sus ventas
            </Typography>
          </Box>
        </Box>
      </AuthContainer>
    </>
  );
};

export default Signup;
