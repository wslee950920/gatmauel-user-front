import React from "react";
import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(2),
  },
}));

const FullWidthTabs = ({ handleChange, value, children, account }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor={clsx(
            account && value === 1 ? "secondary" : "primary"
          )}
          textColor={clsx(account && value === 1 ? "secondary" : "primary")}
          variant="fullWidth"
          aria-label="full width tabs"
        >
          {children}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default React.memo(FullWidthTabs);
