import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MapIcon from "@material-ui/icons/Map";

const selectIcon = (text) => {
  if (text === "홈") {
    return <HomeIcon />;
  } else if (text === "리뷰") {
    return <RateReviewIcon />;
  } else if (text === "주문하기") {
    return <LocalShippingIcon />;
  } else if (text === "오시는길") {
    return <MapIcon />;
  }
};

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  primary: {
    textDecorationLine: "line-through",
  },
});

const DrawerList = ({ toggleDrawer }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["홈", "리뷰", "주문하기", "오시는길"].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>{selectIcon(text)}</ListItemIcon>
            <ListItemText
              primary={text}
              classes={{
                primary: clsx({ [classes.primary]: text === "주문하기" }),
              }}
              primaryTypographyProps={{
                color: clsx(text === "주문하기" ? "textSecondary" : "inherit"),
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default React.memo(DrawerList);
