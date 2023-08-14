import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { InputBase } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        height: {
          s_xl: "calc(100% - 257px)",
          s_md: "calc(100% - 180px)",
          sm: "calc(100% - 155px)",
          xs: "calc(100% - 145px)",
        },
        overflowY: "auto",
      }}
      className="chat-tabpanel"
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs({
  lables,
  values,
  searchTerm,
  setSearchTerm,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ height: { s_xl: "80px" } }}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {lables.map((item, index) => (
            <Tab
              sx={{ height: { s_xl: "80px" } }}
              disableRipple
              key={index}
              label={item}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <InputBase
        fullWidth
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          height: { s_xl: 60, lg: 50, xs: 45 },
          padding: "10px 30px 10px 30px",
          borderBottom: "1px solid #DDE6EB",
        }}
      />
      {values.map((item, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {item}
        </CustomTabPanel>
      ))}
    </>
  );
}
