import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import ListItemLink from "./ListItemLink";
import selectIcon from "./SelectIcon";
import menus from "./DrawerMenu";

const useStyles = makeStyles({
  list: {
    width: 250,
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
      <List aria-label="home review order map">
        {menus.map((menu) => (
          <ListItemLink
            key={menu.text}
            to={menu.to}
            primary={menu.text}
            icon={selectIcon(menu.text)}
          />
        ))}
      </List>
    </div>
  );
};

export default React.memo(DrawerList);
