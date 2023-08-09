import { Box, Divider, styled } from "@mui/material";

export const CustomDivider = styled(Divider)(({ theme }) => ({
  margin:'30px 0px',
  width:'70%',
  [theme.breakpoints.down("lg")]: {
    width:'100%',
  }

}))

export const SettingsDynamoBox = styled(Box)(({ theme }) => ({
  h4: {
    padding: "30px 20px",
    fontSize: 25,
    fontWeight: 600,
  },
  h5: {
    fontSize: "18px",
    display: "flex",
    gap: "10px",
  },
  "& input[type = text]": {
    boxSizing: "border-box",
    border: "1px solid #DDE6EB",
    height: "100px !important",
    width: "300px",
    padding: "25px 100px 25px 25px",
    overflowY: "auto !important",
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px grey",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(20, 133, 255, 0.83)",
    },
  },
  textarea: {
    boxSizing: "border-box",
    border: "1px solid #DDE6EB",
    height: "100px !important",
    width: "300px",
    padding: "25px 100px 25px 25px",
    overflowY: "auto !important",
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px grey",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(20, 133, 255, 0.83)",
    },
  },
  "& .addMain": {
    position: "relative",
    display: "inline-block",
    "& .addBtn": {
      textTransform: "capitalize",
      padding: "0px 20px",
      position: "absolute",
      right: "30px",
      top: "30px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    h4: {
      padding: "30px 0px",
      fontSize: 22,
    },
    "& .addMain": {
      width: "100%",
    },
    textarea: {
      width: "100%",
    },
  },
}));
