import React from "react";
import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(2),
  },
}));
const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const FullWidthTabs = ({ handleChange, value }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor={clsx(value === 1 ? "secondary" : "primary")}
          textColor={clsx(value === 1 ? "secondary" : "primary")}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="PW변경" {...a11yProps(0)} />
          <Tab label="탈퇴" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default React.memo(FullWidthTabs);
