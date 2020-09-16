import React, { useCallback } from "react";

import LockIcon from "@material-ui/icons/Lock";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Copyright from "../common/Copyright";
import FullWidthTabs from "./tabs";
import Password from "./password";
import TabPanel from "./tabs/TabPanel";
import Withdraw from "./withdraw";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        <FullWidthTabs handleChange={handleChange} value={value} />
        <TabPanel value={value} index={0}>
          <Password />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Withdraw />
        </TabPanel>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Profile;
