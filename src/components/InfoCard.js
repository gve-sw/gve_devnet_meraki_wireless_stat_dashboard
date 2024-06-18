import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const InfoCard = ({ title, content }) => {
  return (
    <Card sx={{ backgroundColor: '#f7f7f7' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" component="div">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
