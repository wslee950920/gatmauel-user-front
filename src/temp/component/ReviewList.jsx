import React from "react";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";

import Circular from '../../components/common/Circular'

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
  title: {
    margin: theme.spacing(2, 1, 0),
    flex: 1,
  },
  box: {
    display: "flex",
    alignItems: "baseline",
  },
  more: {
    marginRight: theme.spacing(1),
  },
}));

const ReviewList = () => {
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div style={{ padding: theme.spacing(0.8) }}>
        <Container className={classes.background}>
          <div className={classes.box}>
            <Typography variant="subtitle1" className={classes.title} noWrap>
              Review
            </Typography>
            <Link
              component={RouterLink}
              to="/review"
              color="secondary"
              variant="caption"
              className={classes.more}
            >
              더 보기{">"}
            </Link>
          </div>
          <div>
            <List>
              <Circular
                container={{
                  height: 144,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </List>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ReviewList;
