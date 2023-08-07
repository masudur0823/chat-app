import React from "react";
import { ListMain, SidebarBox } from "../../assets/styles/sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  const menuList = [
    {
      icon: <ChatBubbleOutlineIcon sx={{ fontSize: "35px" }} />,
      path: "/",
      label: "Chat",
    },
    {
      icon: <ContactsIcon sx={{ fontSize: "35px" }} />,
      path: "/contacts",
      label: "Contacts",
    },
    {
      icon: <PersonIcon sx={{ fontSize: "40px" }} />,
      path: "/integrations",
      label: "Integrations",
    },
    {
      icon: <SettingsIcon sx={{ fontSize: "35px" }} />,
      path: "/settings",
      label: "Settings",
    },
  ];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <SidebarBox>
      <Box className="logoContainer">
        <Typography className="logoName" onClick={handleClick}>
          IT
        </Typography>
      </Box>
      <ListMain>
        {menuList.map((item, index) => (
          <IconButton
            disableRipple
            key={index}
            component={NavLink}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to={item.path}
            state={{ title: item.label }}
          >
            {item.icon}
          </IconButton>
        ))}
      </ListMain>
      <ListMain>
        <Box className="logout">
          <LogoutIcon sx={{ fontSize: "35px" }} />
        </Box>
      </ListMain>
    </SidebarBox>
  );
}

export default Sidebar;
