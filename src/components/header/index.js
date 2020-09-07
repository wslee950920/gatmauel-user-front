import React, { useState, useCallback } from "react";
import loadable from "@loadable/component";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";

const AccountMenu = loadable(() => import("./AccountMenu"));
const Drawer = loadable(() => import("./Drawer"));

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
  const [accountEl, setAccountEl] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const isMenuOpen = Boolean(accountEl);
  const menuId = "account-menu";

  const handleMenuOpen = useCallback((event) => {
    setAccountEl(event.currentTarget);
  }, []);
  const handleMenuClose = useCallback(() => {
    setAccountEl(null);
  }, []);
  const accountMouseOver = useCallback(() => {
    AccountMenu.preload();
  }, []);

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setDrawer(open);
    },
    []
  );
  const drawerMouseOver = useCallback(() => {
    Drawer.preload();
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            onMouseOver={drawerMouseOver}
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
              onMouseOver={accountMouseOver}
              className={classes.title}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isMenuOpen && (
        <AccountMenu
          menuId={menuId}
          accountEl={accountEl}
          handleMenuClose={handleMenuClose}
          isMenuOpen={isMenuOpen}
        />
      )}
      {drawer && <Drawer open={drawer} toggleDrawer={toggleDrawer} />}
    </div>
  );
};

export default Header;
