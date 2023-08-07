import { createTheme } from "@mui/material";

export const Colors = {
  white: "#fff",
  black: "#000",
  violet: "#6C63FF",
  primary: "#001F2B",
  lightGreen: "rgba(25, 235, 134, 0.83)",
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      s_md: 769,
      md: 900,
      lg: 1200,
      s_xl: 1441,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: Colors.primary,
      contrastText: Colors.white,
    },
    violet: {
      main: Colors.violet,
      contrastText: Colors.white,
    },
    white: {
      main: Colors.black,
      contrastText: Colors.white,
    },
    lightGreen: {
      main: Colors.lightGreen,
      contrastText: Colors.white,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
});

export default theme;
