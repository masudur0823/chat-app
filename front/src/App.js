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
import Layout from "./components/Layout/Layout";
import ChatLayout from "./components/Layout/ChatLayout";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      <Router>
        <SocketContext.Provider value={socket}>
          <ContactProvider>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ChatLayout />}>
                <Route
                  path="/"
                  element={<PrivateWrapper element={<Chat />} />}
                />
              </Route>
              <Route element={<Layout />}>
                <Route
                  path="/settings"
                  element={<PrivateWrapper element={<Settings />} />}
                />
                <Route
                  path="/contacts"
                  element={<PrivateWrapper element={<Contacts />} />}
                />
              </Route>
              {/* <Route element={<ChatLayout />}>
                <Route index path="/" element={<Chat />} />
              </Route> */}

              {/* <Route element={<Layout />}>
                <Route path="/settings" element={<Settings />} />
                <Route path="/contacts" s element={<Contacts />} />
                <Route path="/integrations" element={<Integrations />} />
              </Route> */}

              <Route
                path="/numbers"
                element={
                  <PrivateWrapper element={<Numbers />} requiredRole="admin" />
                }
              />
              <Route element={<Layout />}>
                <Route
                  path="/integrations"
                  element={<PrivateWrapper element={<Integrations />} />}
                />
              </Route>
              {/* <Route path="/integrations" element={<Integrations />} /> */}

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
