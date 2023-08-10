import React from "react";
import { LayoutBox } from "../../assets/styles/layout";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function ChatLayout() {
  return (
    <LayoutBox>
      <Box className="left">
        <Sidebar />
      </Box>
      <Box className="right">
        <Outlet />
      </Box>
    </LayoutBox>
  );
}

export default ChatLayout;
