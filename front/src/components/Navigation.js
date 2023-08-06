import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

function Navigation() {


  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button key="Chat" component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Chat" />
          </ListItem>
          <ListItem button key="Contacts" component={Link} to="/contacts" onClick={toggleDrawer}>
            <ListItemText primary="Contacts" />
          </ListItem>
          <ListItem button key="Numbers" component={Link} to="/numbers" onClick={toggleDrawer}>
            <ListItemText primary="Numbers" />
          </ListItem>
          <ListItem button key="Settings" component={Link} to="/settings" onClick={toggleDrawer}>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navigation;
