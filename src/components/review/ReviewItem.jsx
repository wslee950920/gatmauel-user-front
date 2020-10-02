import React from "react";

import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

import Feed from "./Feed";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
  },
}));

const ReviewItem = ({ data, style }) => {
  const classes = useStyles();

  return (
    <ListItem style={style} classes={{ root: classes.root }}>
      <Feed data={data} />
    </ListItem>
  );
};

export default React.memo(ReviewItem);
