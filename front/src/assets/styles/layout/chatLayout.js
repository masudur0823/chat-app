import { Box, styled } from "@mui/material";

export const ChatLayoutBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "97px 1fr",
  ".left": {
    background: "#001F2B",
    minHeight: "100vh",
    position: "relative",
  },
  ".right": {

  },
  [theme.breakpoints.down("s_xl")]: {
    gridTemplateColumns: "60px 1fr",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "40px 1fr",
  },
}));
