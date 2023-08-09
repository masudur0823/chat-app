import { Box, styled } from "@mui/material";

export const LayoutBox = styled(Box)(({theme}) => ({
  display: "flex",
  ".left": {
    minWidth: "97px",
    background:'#001F2B',
    minHeight: '100vh',
    position:'relative'
  },
  ".right": {
    width: "100%",
    minWidth:'0px'
  },
  [theme.breakpoints.down("s_xl")]: {
    ".left": {
      minWidth:'60px'
    }
  },
  [theme.breakpoints.down("sm")]: {
    ".left": {
      minWidth:'40px'
    },
  }

}));
