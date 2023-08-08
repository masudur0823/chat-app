import { createTheme } from "@mui/material";

export const Colors = {
  white: "#fff",
  black: "#000",
  violet: "#6C63FF",
  primary: "#001F2B",
  lightGreen: "rgba(25, 235, 134, 0.83)",
  lightBlue: "rgba(20, 133, 255, 0.83)",
  lightRed: "rgba(235, 25, 25, 0.83)",
  lightGrey:'#F4F8FA'
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
    lightBlue: {
      main: Colors.lightBlue,
      contrastText: Colors.white,
    },
    lightRed: {
      main: Colors.lightRed,
      contrastText: Colors.white,
    },
    lightGrey: {
      main: Colors.lightGrey,
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
