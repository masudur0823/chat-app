import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import { AuthContext } from "../../context/authContext";
import jwtDecode from "jwt-decode";
import {
  AuthButtonBox,
  AuthContainer,
  AuthImage,
  AuthInputBox,
  AuthLeftBox,
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
import googleIcon from "../../assets/images/flat-color-icons_google.svg";
import authImg from "../../assets/images/AuthPageImage.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post("/auth/login", { username, password });
      const token = response.data.token;
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Extract the tenantID from the decoded token
      const tenantID = decodedToken.tenantID;
      const userId = decodedToken.iduser;
      localStorage.setItem("token", token);
      localStorage.setItem("tenantID", tenantID);
      localStorage.setItem("userId", userId);

      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      http.defaults.headers.common["tenantID"] = tenantID;
      http.defaults.headers.common["userId"] = userId ? userId : "";

      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {/* <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div> */}
      <AuthContainer>
        <Box className="child-1">
          <AuthLeftBox>
            <Typography variant="h1">Login</Typography>
            <Stack gap={{ s_xl: 4, lg: 3, xs: 2 }}>
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
              ¿No tienes una cuenta? <Link to="/signup">Sign Up</Link>
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

export default Login;
