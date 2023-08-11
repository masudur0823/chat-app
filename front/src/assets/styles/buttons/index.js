import { Button, styled } from "@mui/material";

export const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  fontWeight: 800,
  padding: "5px 40px",
  [theme.breakpoints.down("s_xl")]: {
    padding: "3px 30px",
  },
}));

export const CustomButton2 = styled(Button)(({ theme }) => ({
  boxSizing: "border-box",
  textTransform: "capitalize",
  padding: "0px 10px",
  minWidth: 75,
  width: "fit-content",
  height: 30,
  borderRadius: 20,
  fontSize: 14,
  fontWeight: 300,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    padding: "0px 5px",
    height: 22,
  },
}));
