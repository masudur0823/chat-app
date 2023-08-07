import { Typography } from "@mui/material";
import React from "react";
import { HeaderBox } from "../../assets/styles/header";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <HeaderBox>
      <Typography color="primary">{location?.state?.title}</Typography>
    </HeaderBox>
  );
}

export default Header;
