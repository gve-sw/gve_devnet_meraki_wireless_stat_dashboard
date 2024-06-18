import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Drawer,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";

const Sidebar = ({ setOrganizationInfo, setNetworkInfo }) => {
  const [organizations, setOrganizations] = useState([]);
  const [networks, setNetworks] = useState({});
  const [open, setOpen] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/organizations")
      .then(response => setOrganizations(response.data))
      .catch(error => console.error("Error fetching organizations:", error));
  }, []);

  const handleClick = (orgId) => {
    setOpen((prevOpen) => ({ ...prevOpen, [orgId]: !prevOpen[orgId] }));
    if (!networks[orgId]) {
      axios.get(`http://localhost:8000/organizations/${orgId}/networks`)
        .then(response => setNetworks((prevNetworks) => ({ ...prevNetworks, [orgId]: response.data })))
        .catch(error => console.error(`Error fetching networks for org ${orgId}:`, error));
    }
  };

  const handleNetworkClick = (orgId, orgName, networkId, networkName) => {
    console.log(`Organization clicked: ${orgId}, Network clicked: ${networkId}`); // Debugging line
    setOrganizationInfo({ orgId, orgName });
    setNetworkInfo({ networkId, networkName });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        edge="start"
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <List component="nav">
          {organizations.map((org) => (
            <div key={org.id}>
              <ListItem button onClick={() => handleClick(org.id)}>
                <ListItemText primary={org.name} />
                {open[org.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[org.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {networks[org.id] && networks[org.id].map((network) => (
                    <ListItem button key={network.id} sx={{ pl: 4 }} onClick={() => handleNetworkClick(org.id, org.name, network.id, network.name)}>
                      <ListItemText primary={network.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
