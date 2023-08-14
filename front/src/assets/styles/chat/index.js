import { Badge, Box, styled } from "@mui/material";

export const ChatContainerBox = styled(Box)(({ theme, show }) => ({
  display: "flex",
  width: "100%",
  ".chat-left": {
    height: "100vh",
    // overflowY: "auto",
    minWidth: "377px",
    borderRight: "1px solid #DDE6EB",
    "& .chat-left-header": {
      height: "115px",
      borderBottom: "1px solid #DDE6EB",
      display: "flex",
      alignItems: "center",
      paddingLeft: "70px",
      p: {
        fontSize: "35px",
        fontWeight: 600,
      },
    },
  },
  ".chat-tabpanel": {
    "&::-webkit-scrollbar": {
      width: 3,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#1485FF",
    },
  },
  ".chat-right": {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    background: "#F4F8FA",
    "& .chat-right-header": {
      background: "#fff",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      width: "100%",
      borderBottom: "1px solid #DDE6EB",
      "& .chat-header-inner": {
        padding: 20,
        height: 115,
        boxSizing: "border-box",
      },
      h2: {
        fontSize: 20,
        fontWeight: 500,
      },
      ".tag": {
        padding: "0px 10px",
        minWidth: 75,
        width: "fit-content",
        height: 30,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: {
          fontSize: "14px",
        },
      },
    },
    "& .chat-right-body": {
      padding: 30,
      flex: 1,
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: 10,
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#1485FF",
      },
    },
    "& .chat-right-footer": {
      display: "flex",
      flexDirection: "column",

      border: "1px solid #DDE6EB",
      margin: "0px 30px",
      background: "#fff",
      "& .suggestionBox": {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
        boxSizing: "border-box",
        borderBottom: "1px solid #DDE6EB",
        height: 65,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: 2,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#1485FF",
        },
        "&:first-child": {
          paddingLeft: 10,
        },
        "&:last-child": {
          paddingRight: 10,
        },
      },
      "& .chat-input-container": {
        height: 85,
        width: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: 5,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#1485FF",
        },
        "& .chat-input-inner": {
          height: "100%",
          width: "100%",
          display: "flex",
          // justifyContent:'space-between',
          alignItems: "flex-start",

          "& .MuiInputBase-root": {
            width: "100%",
            textarea: {
              width: "100%",
              padding: 20,
            },
          },

          "& .beside-chat-input": {
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            display: "flex",
            gap: 10,
            button: {
              background: "rgba(20, 133, 255, 0.10)",
              width: 50,
              height: 50,
              borderRadius: 6,
              "&:last-child": {
                background: "rgba(20, 133, 255)",
                "&.Mui-disabled": {
                  opacity: 0.5,
                },
              },
            },
          },
        },
      },
    },
  },

  [theme.breakpoints.down("s_xl")]: {
    ".chat-left": {
      minWidth: "360px",
      "& .chat-left-header": {
        height: "80px",
        paddingLeft: "50px",
        p: {
          fontSize: "30px",
        },
      },
    },
    ".chat-right": {
      "& .chat-right-header": {
        "& .chat-header-inner": {
          padding: 10,
          height: 80,
        },
        h2: {
          fontSize: 18,
        },
      },
    },
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    ".chat-left": {
      display: show === 0 ? "block" : "none",
    },
    ".chat-right": {
      display: show === 1 ? "flex" : "none",
      // "& .chat-right-header":{
      //   display:'none'
      // }
    },
  },

  [theme.breakpoints.down("s_md")]: {
    ".chat-left": {
      "& .chat-left-header": {
        height: "60px",
        paddingLeft: "20px",
        p: {
          fontSize: "22px",
        },
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    ".chat-left": {
      minWidth: "initial",
      "& .chat-left-header": {
        height: "50px",
      },
    },
    ".chat-right": {
      "& .chat-right-header": {
        "& .chat-header-inner": {
          overflowY: "auto",
        },
      },
      "& .chat-right-footer": {
        "& .chat-input-container": {
          height: 60,
          "& .chat-input-inner": {
            "& .MuiInputBase-root": {
              textarea: {
                padding: 10,
              },
            },

            "& .beside-chat-input": {
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              display: "flex",
              gap: 10,
              button: {
                width: 35,
                height: 35,
                borderRadius: 4,
              },
            },
          },
        },
      },
    },
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      //   border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
