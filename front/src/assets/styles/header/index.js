import { Box, styled } from "@mui/material";

export const HeaderBox = styled(Box)(({theme}) => ({
  height: "115px",
  borderBottom: "1px solid #DDE6EB",
  display: "flex",
  alignItems: "center",
  paddingLeft: "70px",
  p: {
    fontSize: "35px",
    fontWeight: 600,
  },
  [theme.breakpoints.down("s_xl")]: {
    height: "80px",
    paddingLeft: "50px",
    p: {
      fontSize: "30px",
    },
  }

}));
