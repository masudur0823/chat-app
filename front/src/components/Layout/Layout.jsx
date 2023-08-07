import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { LayoutBox } from "../../assets/styles/layout";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <LayoutBox>
      <Box className="left">
        <Sidebar />
      </Box>
      <Box className="right">
        <Header />
        <Box p={{md:3, xs:2}}>
          <Outlet />
        </Box>
      </Box>
    </LayoutBox>
  );
}

export default Layout;
