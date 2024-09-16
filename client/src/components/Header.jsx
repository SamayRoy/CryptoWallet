import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" style={{ flexGrow: 1 }}>
          Crypto Portfolio
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={RouterLink} to="/watchlist">
          Watch List
        </Button>
        <Button color="inherit" component={RouterLink} to="/transfer">
          Transfer
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
