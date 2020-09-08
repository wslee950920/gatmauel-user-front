import React from "react";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";

import ListItemLink from "./ListItemLink";

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
  content: {
    fontSize: "0.7rem",
    color: "#808080",
  },
  box: {
    display: "flex",
    alignItems: "baseline",
  },
  primary: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

function generate(element) {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const ReviewList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div style={{ padding: "0.4rem" }}>
        <Container maxWidth="xl" className={classes.background}>
          <div className={classes.box}>
            <Typography variant="subtitle1" className={classes.title} noWrap>
              Review
            </Typography>
            <Link
              component={RouterLink}
              to="#"
              color="secondary"
              variant="caption"
            >
              더 보기{">"}
            </Link>
          </div>
          <div>
            <List>
              {generate(<ListItemLink primary="맛있어요!!!" to="#" />)}
            </List>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ReviewList;
