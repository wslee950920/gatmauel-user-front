import React, { useState, useCallback, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import loadable from "@loadable/component";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";

import Drawer from "./Drawer";
const AccountMenu = loadable(() => import("./AccountMenu"));

const useClasses = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  icon: {
    display: "block",
    color: "black",
  },
  section: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#feffff",
  },
  base: {
    background: "#feffff",
  },
}));

const Header = ({ user }) => {
  const classes = useClasses();
  const [accountEl, setAccountEl] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const isMenuOpen = Boolean(accountEl);
  const menuId = useRef("account-menu");

  const handleMenuOpen = useCallback((event) => {
    setAccountEl(event.currentTarget);
  }, []);
  const handleMenuClose = useCallback(() => {
    setAccountEl(null);
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

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.icon} variant="h6" noWrap>
            <Link component={RouterLink} to="/" color="inherit">
              갯마을
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.section}>
            <IconButton
              aria-label="show new notifications"
              className={classes.icon}
              disabled
            >
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account-menu"
              aria-controls={menuId.current}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              className={classes.icon}
              {...(!user && {
                component: RouterLink,
                to: "/login",
              })}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {user && (
        <AccountMenu
          menuId={menuId.current}
          accountEl={accountEl}
          handleMenuClose={handleMenuClose}
          isMenuOpen={isMenuOpen}
        />
      )}
      <Drawer open={drawer} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default React.memo(Header);
