import { TableContainer, styled } from "@mui/material";

export const TableContainerBox = styled(TableContainer)(({ theme }) => ({
  th: {
    padding: "10px 20px",
    color: "#000",
    fontSize: "18px",
    borderBottom: "2px solid #DDE6EB",
  },
  td: {
    padding: "25px 20px",
    color: "#000",
    fontSize: "16px",
    borderBottom: "1px solid #DDE6EB",
  },

  tbody: {
    tr: {
      "&:last-child td, &:last-child th": { border: 0 },
      "&:nth-of-type(even)": {
        background: "#F4F8FA",
      },
    },
  },

  [theme.breakpoints.down("s_xl")]: {
    th: {
      fontSize: "16px",
      padding: "7px 15px",
    },
    td:{
      fontSize: "14px",
      padding: "10px 15px",
    }
  },
}));
