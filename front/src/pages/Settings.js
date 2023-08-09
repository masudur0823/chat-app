import React, { useState, useEffect } from "react";
import http from "../utils/http";
import {
  Switch,
  Button,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import SettingsDynamo from "../components/SettingsDynamo";
import { CustomDivider } from "../assets/styles/settings";

function Settings() {
  const [isOwnerView, setIsOwnerView] = useState("no");
  const [communicationMode, setCommunicationMode] = useState("Unofficial");
  const [asignacion, setAsignacion] = useState(""); // Initialize asignacion state
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    http
      .get("/settings")
      .then((response) => {
        const settingsData = response.data[0];
        setIsOwnerView(settingsData?.permissionall === "yes" ? "yes" : "no");
        setCommunicationMode(settingsData?.communicationmode);
        setAsignacion(settingsData?.asignacion || ""); // Set the asignacion value
        setSettings(settingsData);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  const handleOwnerViewChange = (event) => {
    setIsOwnerView(event.target.checked ? "yes" : "no");
  };

  const handleCommunicationModeChange = (event) => {
    setCommunicationMode(event.target.checked ? "Official" : "Unofficial");
  };

  const handleAsignacionChange = (event) => {
    setAsignacion(event.target.value); // Update asignacion value
  };

  const handleSaveSettings = () => {
    if (!settings) return;

    const updatedSettings = {
      ...settings,
      permissionall: isOwnerView,
      communicationmode: communicationMode,
      asignacion, // Save the asignacion value
    };

    http
      .put(`/settings`, updatedSettings)
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        console.error("Error updating settings:", error);
      });
  };

  // dummy data for tags
  const TagsList = [
    "Urgent",
    "Not Interested",
    "Ex-Customer",
    "xyz",
    "abc",
    "fhf",
    "www",
    "kkkk",
    "llls",
    "oooo",
    "oooo",
    "oooo",
    "oooo",
    "oooo",
    "oooo",
    "oooo",
    "tttt",
    "tttt",
    "tttt",
    "tttty",
  ];
  // dummy data for Quick answer

  const QuickAnsLists = [
    "Hi Nice to meet you",
    "How can i help you?",
    "We will look forward for you",
    "xyz",
    "lsd",
    "salam",
    "ola",
  ];

  return (
    <Box>
      <SettingsDynamo data={TagsList} title="Tags" addTitle="New Tag" />
      <CustomDivider />
      <SettingsDynamo
        data={QuickAnsLists}
        title="Quick Answers"
        addTitle="New Quick Answer"
      />
      <CustomDivider />
      
      <Box component="div" marginBottom="1em">
        <FormControlLabel
          control={
            <Switch
              checked={isOwnerView === "yes"}
              onChange={handleOwnerViewChange}
            />
          }
          label="Agent view only owned chats"
        />
      </Box>
      <Box component="div" marginBottom="1em">
        <h2>Integration Whatsapp</h2>
        <FormControlLabel
          control={
            <Switch
              checked={communicationMode === "Official"}
              onChange={handleCommunicationModeChange}
            />
          }
          label={communicationMode}
        />
      </Box>
      <Box component="div" marginBottom="1em">
        <h2>Asignacion</h2>
        <FormControl fullWidth sx={{ width: "200px" }}>
          <InputLabel id="asignacion-label">Asignacion</InputLabel>
          <Select
            labelId="asignacion-label"
            value={asignacion}
            onChange={handleAsignacionChange}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Carussel">Carussel</MenuItem>
            <MenuItem value="Connected">Connected</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </Box>
  );
}

export default Settings;
