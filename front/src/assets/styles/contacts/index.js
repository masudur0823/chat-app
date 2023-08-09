import { Button, styled } from "@mui/material";

export const CustomButton = styled(Button)(({theme}) => ({
  borderRadius: "30px",
  fontWeight: 800,
  padding:'5px 40px',
  [theme.breakpoints.down("s_xl")]: {
    padding:'3px 30px',
  }

}));
