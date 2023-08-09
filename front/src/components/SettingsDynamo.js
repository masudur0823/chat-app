import React, { useState } from "react";
import { SettingsDynamoBox } from "../assets/styles/settings";
import { Box, Grid, InputBase, Typography } from "@mui/material";
import SettingsTable from "./SettingsTable";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { CustomButton } from "../assets/styles/buttons";

function SettingsDynamo({ data, title, addTitle }) {
  const [tag, setTag] = useState("");

  return (
    <SettingsDynamoBox>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Grid
        container
        spacing={{ s_xl: 5, lg: 3, md: 2 }}
        gap={{ sm: 0, xs: 1 }}
        flexDirection={{ sm: "row", xs: "column-reverse" }}
      >
        <Grid item lg={4} s_md={6} xs={12}>
          <SettingsTable data={data} />
        </Grid>

        <Grid item lg={8} s_md={6} xs={12}>
          <Typography variant="h5">
            {addTitle} <HelpOutlineIcon color="yellow" />
          </Typography>
          <Box className="addMain">
            <InputBase
              fullWidth
              placeholder="Write Here"
              multiline
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <CustomButton
              variant="contained"
              color="lightBlue"
              className="addBtn"
            >
              Add
            </CustomButton>
          </Box>
        </Grid>
      </Grid>
   
    </SettingsDynamoBox>
  );
}

export default SettingsDynamo;
