import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";

import ProfileMenu from "./ProfileMenu";

const useClasses = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    color: "black",
  },
  section: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#feffff",
  },
}));

const Header = () => {
  const classes = useClasses();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "profile-menu";

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            갯마을
          </Typography>
          <div className={classes.grow} />
          <div className={classes.section}>
            {/*TODO:추후 알림이 있을 때만 검은색(classes.title)으로 강조되게끔한다.*/}
            <IconButton
              aria-label="show new notifications"
              className={classes.title}
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              className={classes.title}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {isMenuOpen && (
        <ProfileMenu
          menuId={menuId}
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          isMenuOpen={isMenuOpen}
        />
      )}
    </div>
  );
};

export default Header;
