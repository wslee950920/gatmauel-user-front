import React, { useCallback, useState } from "react";

import AccessibilityIcon from "@material-ui/icons/Accessibility";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tab from "@material-ui/core/Tab";

import FullWidthTabs from "../common/Tabs";
import Password from "./password";
import TabPanel from "../common/Tabs/TabPanel";
import Withdraw from "./withdraw";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    margin: theme.spacing(1),
    width: "5rem",
    height: "5rem",
  },
}));

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const Account = ({ info, error, onChange, onSubmit }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <AccessibilityIcon
            fontSize="large"
            color="action"
            className={classes.icon}
          />
          <Typography component="h1" variant="h5">
            내 계정
          </Typography>
          <FullWidthTabs handleChange={handleChange} value={value} account>
            <Tab label="PW변경" {...a11yProps(0)} />
            <Tab label="탈퇴" {...a11yProps(1)} />
          </FullWidthTabs>
          <TabPanel value={value} index={0}>
            <Password error={error} onChange={onChange} onSubmit={onSubmit} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Withdraw email={info && info.email} />
          </TabPanel>
        </div>
      </Container>
    </>
  );
};

export default React.memo(Account);
