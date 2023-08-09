import { TableContainer, styled } from "@mui/material";

export const SettingsTableContainer = styled(TableContainer)(() => ({
  th: {
    textAlign: "center",
    padding: "2px 10px",
    color: "#000",
    fontSize: "18px",
    borderBottom: "1px solid #DDE6EB",
  },
  td: {
    padding: "5px 10px",
    color: "#000",
    textAlign: "center",
    fontSize: "16px",
    borderBottom: "0px solid #DDE6EB",
  },
  tbody: {
    tr: {
      "&:nth-of-type(even)": {
        background: "#F4F8FA",
      },
    },
  },
}));
