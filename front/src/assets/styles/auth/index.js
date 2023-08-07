import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  styled,
} from "@mui/material";

export const AuthContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  ".child-1": {
    padding: "20px 0px",
    flex: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    h1: {
      color: "#001F2B",
      textAlign: "center",
      fontSize: "35px",
      fontWeight: 600,
      marginBottom: "50px",
    },
  },
  ".child-2": {
    flex: "50%",
    background: "linear-gradient(45deg, #07F 0%, #7DD2FF 100%)",
    color: "#fff",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    h3: {
      fontSize: "45px",
      fontWeight: 700,
      textAlign: "end",
      position: "absolute",
      right: "48px",
      top: "48px",
    },
    h4: {
      textAlign: "center",
      fontSize: "35px",
      fontWeight: 400,
      maxWidth: "448px",
      margin: "0 auto",
      marginTop: "46px",
    },
  },
  [theme.breakpoints.down("s_xl")]: {
    ".authImg": {
      width: "70%",
      margin: "0 auto",
      display: "block",
      // height:'300px'
    },
    ".child-1": {
      h1: {
        fontSize: 30,
        marginBottom: 30,
      },
    },
    ".child-2": {
      h3: {
        fontSize: "35px",
        right: "30px",
        top: "30px",
      },
      h4: {
        maxWidth: "348px",
        fontSize: "25px",
        marginTop: "36px",
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    ".authImg": {
      width: "90%",
      // height:'300px'
    },
    ".child-1": {
      padding: "20px",
    },
    ".child-2": {
      h3: {
        fontSize: "35px",
        right: "30px",
        top: "30px",
      },
      h4: {
        maxWidth: "271px",
        fontSize: "20px",
        marginTop: "36px",
      },
    },
  },
  [theme.breakpoints.down("s_md")]: {
    flexDirection: "column",
    ".child-2": {
      display: "none",
    },
  },
}));

export const AuthImage = styled("img")(({ src, theme }) => ({
  src: { src },
  width: "100%",
}));

export const AuthLeftBox = styled(Box)(({ theme }) => ({
  width: "353px",
  [theme.breakpoints.down("s_md")]: {
    width: "initial",
    maxWidth:'270px'
  }

}));

export const AuthInputBox = styled(Box)(({ theme }) => ({
  h6: {
    color: "#161616",
    fontSize: "25px",
    fontWeight: 400,
    marginBottom: "10px",
  },
  ".MuiInputBase-root": {
    background: "#D7E7FF",
    padding: "5px 20px",
    borderRadius: "8px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    width: "100%",
    input: {
      color: "#505050",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
    },
    " input[type=text]": {
      textDecoration: "underline",
      "&::placeholder": {
        textDecoration: "none",
      },
    },
  },
  [theme.breakpoints.down("s_xl")]: {
    h6: {
      fontSize: 18,
      marginBottom: 8,
    },
    ".MuiInputBase-root": {
      padding: "4px 20px",
    },
  },
}));

export const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: "#161616",
  fontFamily: "Inter",
  fontWeight: 400,
  userSelect: "none",
  marginTop: "20px",
  [theme.breakpoints.down("s_xl")]: {
    ".MuiFormControlLabel-label": {
      fontSize: "14px",
    },
  },
}));

export const CustomCheck = styled(Checkbox)(({ theme }) => ({
  color: "#0333DD",
  "&.Mui-checked": {
    color: "#0333DD",
  },
  "& .MuiSvgIcon-root": { fontSize: 35 },
  [theme.breakpoints.down("s_xl")]: {
    "& .MuiSvgIcon-root": { fontSize: 30 },
  },
}));

export const AuthButtonBox = styled(Stack)(({ theme }) => ({
  marginTop: "50px",
  gap: "30px",
  button: {
    padding: "15px 45px",
    borderRadius: "30px",
    textTransform: "capitalize",
  },
  [theme.breakpoints.down("s_xl")]: {
    marginTop: "30px",
    gap: "20px",
    button: {
      padding: "10px 45px",
    },
  },
  [theme.breakpoints.down("s_md")]: {

    button: {
      padding: "10px 20px",
    },
  },
}));

export const ReferenceText = styled(Typography)(({ theme }) => ({
  marginTop: "40px",
  marginLeft: "40px",
  color: "#373737",
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
  a: {
    textDecoration: "none",
    color: "#0333DD",
    position: "relative",
    "&:after": {
      content: '""',
      width: "100%",
      height: 1,
      background: "#0333DD",
      position: "absolute",
      left: 0,
      bottom: 0,
    },
  },
  [theme.breakpoints.down("s_xl")]: {
    marginTop: "30px",
    marginLeft: "0px",
  },
}));
