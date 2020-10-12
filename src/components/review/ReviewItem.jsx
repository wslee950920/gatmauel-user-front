import React from "react";

import ListItem from "@material-ui/core/ListItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Feed from "./Feed";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    width: "100%",
  },
}));

const ReviewItem = ({ data, style }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <ListItem style={style} classes={{ root: classes.root }}>
        <CssBaseline />
        <Container maxWidth="sm" disableGutters={!matches}>
          <Feed data={data} />
        </Container>
      </ListItem>
    </>
  );
};

export default React.memo(ReviewItem);
