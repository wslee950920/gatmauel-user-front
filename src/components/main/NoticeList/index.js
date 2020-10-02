import React from "react";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import pink from "@material-ui/core/colors/pink";

import ListItemLink from "../../common/MainLists/ListItemLink";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      flex: 1,
    },
  },
  background: {
    backgroundColor: "white",
    border: "solid #dcdcdc",
    borderRadius: "8px",
  },
  info: {
    margin: theme.spacing(2, 1, 0),
    flex: 1,
    color: pink[800],
    "&:hover": {
      color: theme.palette.info.dark,
    },
  },
  box: {
    display: "flex",
    alignItems: "baseline",
  },
  fontRobo: {
    fontFamily: "Roboto",
  },
}));

function generate(element) {
  return [0, 1].map((value) => React.cloneElement(element, { key: value }));
}

const Notice = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div style={{ padding: theme.spacing(0.8) }}>
        <Container className={classes.background}>
          <div className={classes.box}>
            <Link component={RouterLink} to="/notice">
              <Typography variant="subtitle1" className={classes.info}>
                Notice
              </Typography>
            </Link>
          </div>
          <div>
            <List>
              {generate(
                <ListItemLink
                  primary="공지사항 제목"
                  to="#"
                  secondary="19/09/22"
                />
              )}
            </List>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Notice;