import { createTheme } from "@mui/material";

export const Colors = {
  primary: "#001F2B",
  blue: "#1485FF",
  white: "#fff",
  black: "#000",
  violet: "#6C63FF",
  violet2: "#4214FF",
  yellow: "#FFD233",
  orange: "#FF7214",
  lightGreen: "rgba(25, 235, 134, 0.83)",
  lightBlue: "rgba(20, 133, 255, 0.83)",
  lightBlue2: "rgba(20, 133, 255, 0.10)",
  lightRed: "rgba(235, 25, 25, 0.83)",
  lightGrey: "#F4F8FA",
  lightGrey2: "rgba(0, 31, 43, 0.05)",
  lightOrange: "rgba(255, 114, 20, 0.10)",
  lightViolet: "rgba(66, 20, 255, 0.10)",
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      s_sm: 376,
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
    primary2: {
      main: Colors.lightGrey2,
      contrastText: Colors.primary,
    },
    secondary: {
      main: Colors.blue,
    },
    orange: {
      main: Colors.lightOrange,
      contrastText: Colors.orange,
    },
    blue: {
      main: Colors.lightBlue2,
      contrastText: Colors.blue,
    },
    violet: {
      main: Colors.violet,
      contrastText: Colors.white,
    },
    violet2: {
      main: Colors.lightViolet,
      contrastText: Colors.violet2,
    },
    white: {
      main: Colors.black,
      contrastText: Colors.white,
    },
    yellow: {
      main: Colors.yellow,
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
