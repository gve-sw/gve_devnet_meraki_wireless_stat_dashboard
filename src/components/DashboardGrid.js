import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InfoCard from "./InfoCard";
import InfoCardList from "./InfoCardList";
import AppUsageCard from "./AppUsageCard";

const DashboardGrid = ({ organizationId, organizationName, networkId, networkName }) => {
  const [ssidInfo, setSsidInfo] = useState([]);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [responseDateTime, setResponseDateTime] = useState(null);

  const ssidList = [
    {
      ssid: "Reys Network - wireless WiFi",
      apps: [
        { app: "Google", usage: 383 },
        { app: "Youtube", usage: 10223 },
        { app: "Office 365", usage: 2053 },
        { app: "Webex", usage: 383 },
        { app: "Instagram", usage: 10223 },
      ]
    },
    {
      ssid: "JJ's Network",
      apps: [
        { app: "Google", usage: 383 },
        { app: "Youtube", usage: 10223 },
        { app: "Office 365", usage: 2053 },
        { app: "Webex", usage: 383 },
        { app: "Instagram", usage: 10223 },
      ]
    },
    {
      ssid: "JJ2",
      apps: [
        { app: "Google", usage: 383 },
        { app: "Youtube", usage: 10223 },
        { app: "Office 365", usage: 2053 },
        { app: "Webex", usage: 383 },
        { app: "Instagram", usage: 10223 },
      ]
    },
  ];

  const topUsers = [
    { username: "ZZ:11:22:33:AB:55", usage: 2048 },
    { username: "ZZ:11:WE:33:44:EF", usage: 1024 },
    { username: "ZZ:DD:22:33:44:55", usage: 1024 },
    { username: "ZZ:11:22:33:44:55", usage: 1024 },
    { username: "ZZ:11:22:33:AK:55", usage: 1024 },
    { username: "ZZ:EE:22:WW:44:55", usage: 1024 },
    { username: "ZZ:11:22:33:GF:55", usage: 1024 },
    { username: "ZZ:11:SD:33:44:55", usage: 1024 },
    { username: "ZZ:11:22:33:44:55", usage: 1024 },
    { username: "ZZ:11:SD:33:44:55", usage: 512 }
  ];

  const badUsers = [
    { username: "ZZ:11:WE:33:DD:EF", score: 68 },
    { username: "ZZ:HG:WE:33:44:EF", score: 55 },
    { username: "AA:11:WE:33:44:EF", score: 45 },
  ];

  const clientsList = [
    { band: "2.4 Ghz", clients: "3", usage: 383, peak_hour: "12:00-13:00" },
    { band: "5 Ghz", clients: "2", usage: 10223, peak_hour: "14:00-15:00" },
    { band: "6 Ghz", clients: "0", usage: 2053, peak_hour: "8:00-9:00" }
  ];

  useEffect(() => {
    if (organizationId) {
      console.log(`Fetching top SSID information for organization: ${organizationId}`);
      axios.get(`http://localhost:8000/organizations/${organizationId}/summary/top/ssids/byUsage`)
        .then(response => {
          console.log("SSID Info Response:", response.data);
          setSsidInfo(response.data);
        })
        .catch(error => console.error("Error fetching top SSID information:", error));
    }
  }, [organizationId]);

  const handleFetchData = () => {
    axios.post('http://localhost:8000/getDateTime', {
      startDateTime,
      endDateTime,
    })
    .then(response => {
      setResponseDateTime(response.data);
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom>
              Organization: {organizationName} (ID: {organizationId})
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              Network: {networkName} (ID: {networkId})
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: 5 }}>
              <Box sx={{ mr: 2 }}>
                <Typography gutterBottom>Start Date and Time</Typography>
                <DatePicker
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  customInput={<TextField />}
                />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography gutterBottom>End Date and Time</Typography>
                <DatePicker
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  customInput={<TextField />}
                  minDate={startDateTime}
                />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFetchData}
                >
                  Fetch Data
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {responseDateTime && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Response from Backend:
                </Typography>
                <Typography variant="body1">
                  Start Date and Time: {responseDateTime.startDateTime}
                </Typography>
                <Typography variant="body1">
                  End Date and Time: {responseDateTime.endDateTime}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {ssidInfo.map((ssid, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <InfoCard
              title={`SSID: ${ssid.name}`}
              content={
                clientsList.map(client => (
                  <div key={client.band}>
                    <Typography variant="body1"><strong>{client.band} Band:</strong></Typography>
                    <Typography variant="body2">Usage: {client.usage} MB</Typography>
                    <Typography variant="body2">Connected Devices: {client.clients}</Typography>
                    <Typography variant="body2">Peak Hour: {client.peak_hour}</Typography>
                    <br />
                  </div>
                ))
              }
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Top Applications
        </Typography>
        <Grid container spacing={2}>
          {ssidList.map((ssidData, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <AppUsageCard
                ssid={ssidData.ssid}
                apps={ssidData.apps}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <InfoCardList title="Top Usage Clients" items={topUsers} type="topUsers" />
      <InfoCardList title="Bad Clients" items={badUsers} type="badUsers" />
    </Box>
  );
};

export default DashboardGrid;
