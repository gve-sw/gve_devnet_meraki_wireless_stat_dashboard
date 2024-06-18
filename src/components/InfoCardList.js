import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import InfoCard from "./InfoCard";

const InfoCardList = ({ title, items, type }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" component="div" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <InfoCard
              title={
                type === "appUsage"
                  ? `Application: ${item.app}`
                  : type === "topUsers"
                  ? `Client: ${item.username}`
                  : `Bad Client: ${item.username}`
              }
              content={
                type === "appUsage"
                  ? `Usage: ${item.usage} MB`
                  : type === "topUsers"
                  ? `Usage: ${item.usage} KB`
                  : `Score: ${item.score}`
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoCardList;
