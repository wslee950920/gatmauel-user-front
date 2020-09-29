import React, { useCallback, useState } from "react";

import LockIcon from "@material-ui/icons/Lock";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Tab from "@material-ui/core/Tab";

import Copyright from "../footer/Copyright";
import FullWidthTabs from "../common/Tabs";
import FindID from "./findID";
import TabPanel from "../common/Tabs/TabPanel";
import FindPW from "./findPW";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const FindInfo = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LockIcon fontSize="large" color="action" className={classes.icon} />
        <Typography component="h1" variant="h5">
          내 계정
        </Typography>
        <FullWidthTabs handleChange={handleChange} value={value}>
          <Tab label="ID찾기" {...a11yProps(0)} />
          <Tab label="PW찾기" {...a11yProps(1)} />
        </FullWidthTabs>
        <TabPanel value={value} index={0}>
          <FindID />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FindPW />
        </TabPanel>
      </div>
      <Copyright />
    </Container>
  );
};

export default FindInfo;
