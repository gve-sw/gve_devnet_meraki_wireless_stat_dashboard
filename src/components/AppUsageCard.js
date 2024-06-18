import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AppUsageCard = ({ ssid, apps }) => {
  return (
    <Card sx={{ backgroundColor: '#f7f7f7' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          SSID: {ssid}
        </Typography>
        {apps.map((app, index) => (
          <div key={index}>
            <Typography variant="body1"><strong>Application: {app.app}</strong></Typography>
            <Typography variant="body2">Usage: {app.usage} MB</Typography>
            <br />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AppUsageCard;
