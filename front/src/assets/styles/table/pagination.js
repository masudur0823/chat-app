import { Pagination, styled } from "@mui/material";

export const CustomPagination = styled(Pagination)(({ theme, settings }) => ({
  padding: settings === "true" ? "30px 0px 10px 0px" : "50px 0px 30px 0px",
  li: {
    button: {
      fontSize: 16,
      borderRadius: "5px",
    },
    "&:first-child": {
      svg: {
        position: "relative",
        left: "4px",
      },
      button: {
        border: "2px solid rgb(129, 142, 148, 0.54)",
        color: "rgb(129, 142, 148, 0.54)",
        borderRadius: "50%",
      },
    },
    "&:last-child": {
      button: {
        border: "2px solid rgb(129, 142, 148, 0.54)",
        color: "rgb(129, 142, 148, 0.54)",
        borderRadius: "50%",
      },
    },
  },
  [theme.breakpoints.down("s_xl")]: {
    padding: "30px 0px 10px 0px",
  },
}));
