import React from "react";

import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

import Feed from "./Feed";

const useStyles = makeStyles((theme) => ({
  item: {
    flexDirection: "column",
  },
}));

const ReviewItem = ({ data, style }) => {
  const classes = useStyles();
  return (
    <div style={style}>
      <ListItem alignItems="center" className={classes.item}>
        <Feed />
      </ListItem>
    </div>
  );
};

export default React.memo(ReviewItem);
