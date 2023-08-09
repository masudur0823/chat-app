import { Box, styled } from "@mui/material";

export const SidebarBox = styled(Box)(({ theme }) => ({
  ".logoContainer": {
    height: "115px",
    borderBottom: "1px solid #DDE6EB",
    background: "linear-gradient(45deg, #07F 0%, #7DD2FF 100%)",
    ".logoName": {
      fontSize: "45px",
      fontWeight: 700,
      color: "#fff",
      textAlign: "center",
      cursor: "pointer",
    },
  },
  [theme.breakpoints.down("s_xl")]: {
    ".logoContainer": {
      height: "80px",
      ".logoName": {
        fontSize: "35px",
      },
    },
  },
}));

export const ListMain = styled(Box)(({theme}) => ({
  padding: "30px 0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  a: {
    width: "60px",
    height: "60px",
    // background: "red",
    color: "#fff",
    "&:hover": {
      color: "#2468A6",
    },
    "&.active": {
      color: "#2468A6",
    },
  },
  ".logout": {
    background: "#143440",
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    color: "#fff",
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  [theme.breakpoints.down("s_xl")]: {
    a: {
      width: "35px",
      height: "35px",
    },
    ".logout": {
      width: "40px",
      height: "40px",
      borderRadius: "4px"
    },
  },
  
  [theme.breakpoints.down("sm")]: {
    ".logout": {
      width: "28px",
      height: "30px",
      borderRadius: "4px"
    },
  }

}));
