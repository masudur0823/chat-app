import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Contacts from "./pages/Contacts";
import Numbers from "./pages/Numbers";
import NewnumberUnofficial from "./components/NewnumberUnofficial";
import { ContactProvider } from "./context/ContactContext";

import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import { useToken } from "./utils/useToken";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Integrations from "./components/Integrations";
import Templates from "./pages/Templates";
import Statistics from "./pages/Statistics";
import { AuthContext } from "./context/authContext";
import { SocketContext } from "./context/SocketContext"; // import SocketContext
import io from "socket.io-client"; // import io
import jwt_decode from "jwt-decode";
import http from "./utils/http";

const PrivateWrapper = ({ element, requiredRole }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwt_decode(token);
    const userRole = decodedToken.role; // Assuming role is stored as 'role' in JWT

    if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
      return element;
    }
  }

  return <Navigate to="/login" replace />;
};

const socket = io("http://localhost:3000");

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(!!useToken());
  const [userRole, setUserRole] = useState(null);

  /*
   // Create the socket connection here
   let socket = io('http://localhost:3000');
   socket.emit('join', 'user123'); // use actual unique user id
*/

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwt_decode(token);
        const currentUnixTime = Date.now() / 1000;

        // If the token has expired, log the user out and return early
        if (decodedToken.exp < currentUnixTime) {
          handleLogout();
          return;
        }

        const { iduser, tenantID } = decodedToken; // adjust this line according to your token structure
        setUserRole(decodedToken.role);
        http
          .get(`/settings/${tenantID}`)
          .then((response) => {
            const data = response.data;
            if (data.permissionall) {
              socket.emit("join", `Tenant_${tenantID}`);
            } else {
              socket.emit("join", `Tenant_${tenantID}_USER_${iduser}`);
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      }
    }
  }, [isAuthenticated]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setDrawerOpen(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      <Router>
        {/* <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            {/* Common Menu Items for all authenticated users */}
            <ListItem
              button
              key="Chat"
              component={Link}
              to="/"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem
              button
              key="Contacts"
              component={Link}
              to="/contacts"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Contacts" />
            </ListItem>
            <ListItem
              button
              key="Settings"
              component={Link}
              to="/settings"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              button
              key="Integrations"
              component={Link}
              to="/integrations"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Integrations" />
            </ListItem>

            {/* Menu Items only for admin */}
            {userRole === "admin" && (
              <>
                <ListItem
                  button
                  key="Numbers"
                  component={Link}
                  to="/numbers"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Numbers" />
                </ListItem>

                <ListItem
                  button
                  key="Templates"
                  component={Link}
                  to="/templates"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Templates" />
                </ListItem>
                <ListItem
                  button
                  key="Statistics"
                  component={Link}
                  to="/statistics"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Statistics" />
                </ListItem>
              </>
            )}

            {isAuthenticated && (
              <ListItem button key="Logout" onClick={handleLogout}>
                <ExitToAppIcon />
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Drawer>

        <SocketContext.Provider value={socket}>
          <ContactProvider>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateWrapper element={<Chat />} />} />
              <Route
                path="/settings"
                element={<PrivateWrapper element={<Settings />} />}
              />
              {/* <Route
                path="/contacts"
                element={<PrivateWrapper element={<Contacts />} />}
              /> */}
              <Route path="/contacts" element={<Contacts />} />
              <Route
                path="/numbers"
                element={
                  <PrivateWrapper element={<Numbers />} requiredRole="admin" />
                }
              />
              <Route
                path="/integrations"
                element={<PrivateWrapper element={<Integrations />} />}
              />
              <Route
                path="/templates"
                element={
                  <PrivateWrapper
                    element={<Templates />}
                    requiredRole="admin"
                  />
                }
              />
              <Route
                path="/newnumber"
                element={
                  <PrivateWrapper
                    element={<NewnumberUnofficial requiredRole="admin" />}
                  />
                }
              />
              <Route
                path="/statistics"
                element={
                  <PrivateWrapper
                    element={<Statistics requiredRole="admin" />}
                  />
                }
              />
            </Routes>
          </ContactProvider>
        </SocketContext.Provider>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
