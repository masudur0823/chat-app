import { Box, styled } from "@mui/material";

export const LayoutBox = styled(Box)(() => ({
  display: "flex",
  ".left": {
    width: "97px",
    background:'#001F2B',
    minHeight: '100vh',
    position:'relative'
  },
  ".right": {
    width: "100%",
  },
}));
