import React from "react";

import LockIcon from "@material-ui/icons/Lock";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Tab from "@material-ui/core/Tab";

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

const FindInfo = ({
  nickname,
  phone,
  email,
  onChange,
  handleChange,
  value,
  error,
  onSubmit,
  result,
}) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
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
            <FindID
              nickname={nickname}
              phone={phone}
              onChange={onChange}
              error={error}
              onSubmit={onSubmit}
              result={result}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FindPW
              nickname={nickname}
              phone={phone}
              email={email}
              onChange={onChange}
              error={error}
              onSubmit={onSubmit}
            />
          </TabPanel>
        </div>
      </Container>
    </>
  );
};

export default React.memo(FindInfo);
