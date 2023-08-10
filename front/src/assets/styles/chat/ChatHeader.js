import { Box, styled } from "@mui/material";

export const ChatHeader = styled(Box)(({ theme }) => ({
  height: "115px",
  display: "flex",
  borderBottom: "1px solid #DDE6EB",
  ".chat-left": {
    width: "377px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: "70px",
    p: {
      fontSize: "35px",
      fontWeight: 600,
    },
  },
  ".chat-right": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderLeft: "1px solid #DDE6EB",
    padding:'20px'
  },
}));
