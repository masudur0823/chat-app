import { Box, styled } from "@mui/material";

export const ChatContainerBox = styled(Box)(() => ({
  display: "flex",
  
  ".chatboxSidebar": {
    width: "377px",
    height:'80vh',
    borderRight: "1px solid #DDE6EB",
  },
  ".chatboxBody": {
    borderRight: "1px solid #DDE6EB",
  },
}));
