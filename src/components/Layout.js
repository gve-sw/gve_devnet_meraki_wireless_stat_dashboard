import React, { useState, useEffect } from "react";
import { CssBaseline, Box, AppBar } from "@mui/material";
import Sidebar from "./Sidebar";
import DashboardGrid from "./DashboardGrid";
import Footer from "./Footer"; // Adjust the path as necessary
import Header from "./Header"; // Adjust the path as necessary

const Layout = () => {
  const [organizationInfo, setOrganizationInfo] = useState({});
  const [networkInfo, setNetworkInfo] = useState({});

  useEffect(() => {
    console.log(`Selected Organization Info: ${JSON.stringify(organizationInfo)}`); // Debugging line
  }, [organizationInfo]);

  useEffect(() => {
    console.log(`Selected Network Info: ${JSON.stringify(networkInfo)}`); // Debugging line
  }, [networkInfo]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, top: 60 }}>

      </AppBar>
      <Sidebar setOrganizationInfo={setOrganizationInfo} setNetworkInfo={setNetworkInfo} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30, marginTop: 12 }}>
        <DashboardGrid
          organizationId={organizationInfo.orgId}
          organizationName={organizationInfo.orgName}
          networkId={networkInfo.networkId}
          networkName={networkInfo.networkName}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
