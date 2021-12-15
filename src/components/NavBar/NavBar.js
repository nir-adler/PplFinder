import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = useState(0);
  let history = useHistory()
  
  React.useEffect(() => {
    setValue(fromRouteToIndex[history.location.pathname])
  }, [])

  const fromRouteToIndex = {
    '/': 0,
    '/favorites': 1
  }

  const fromIndexToRoute = {
    0: '/',
    1: '/favorites'
  }

  const handleChange = (_e, newValue) => {
    if (history.location.pathname === fromIndexToRoute[newValue]) {
      history.replace(fromIndexToRoute[newValue])
    } else {
      history.push(fromIndexToRoute[newValue])
    }
    setValue(newValue)
  }

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} />
        <Tab label="Favorites" index={1} />

      </Tabs>
    </AppBar>
  );
};

export default NavBar;
