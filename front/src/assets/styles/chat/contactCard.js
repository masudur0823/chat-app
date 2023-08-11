import { Box, styled } from "@mui/material";

export const ContactCardMain = styled(Box)(() => ({
  padding: "10px",
}));

export const ContactCard = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: 10,
  marginBottom: 10,
  borderRadius: 10,
  display: "flex",
  alignItems: "flex-start",
  minHeight: 70,
  position: "relative",
  gap: 15,
  h3: {
    fontSize: 20,
    fontWeight: 500,
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
  },
  p: {
    fontSize: 16,
    fontWeight: 300,
    color: "#818E94",
  },
  span: {
    "&.time": {
      color: "#818E94",
      fontWeight: 300,
      fontSize: 16,
    },
  },
  [theme.breakpoints.down("s_xl")]: {
    gap: 10,
    h3: {
      fontSize: 16,
      fontWeight: 500,
      gap: 5,
    },
    p: {
      fontSize: 12,
      fontWeight: 300,
      color: "#818E94",
    },
    span: {
      "&.time": {
        fontSize: 13,
      },
    },
  },
}));
