import React, { useState, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import AccountMenu from "./AccountMenu";
import Drawer from "./Drawer";
import SearchBar from "../common/SearchBar";

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

const Header = () => {
  const classes = useClasses();
  const [accountEl, setAccountEl] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const isMenuOpen = Boolean(accountEl);
  const menuId = "account-menu";
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleSearch = useCallback(() => {
    setSearch(!search);
  }, [search]);

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

  //{bool&&<Commponent/>}처럼 하면 bool값이 false가 되는 순간
  //Component가 사라져 버리기 때문에 애니메이션 효과 적용이 되지 않는다.
  //그리고 Drawer, AccountMenu 컴포넌트는 Header를 렌더링 할 때 이미 포함되어서
  //렌더링 되므로 코드 스플리팅 의미가 없다. 코드 스플리팅 효과를 보려면
  //{bool&&<Component/>} 방식으로 렌더링 해야 하는데 그러면
  //애니메이션 효과가 적용되지 않는 딜레마가 생긴다.
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
            {search ? (
              <ScopedCssBaseline classes={{ root: classes.base }}>
                <SearchBar handleSearch={handleSearch} />
              </ScopedCssBaseline>
            ) : (
              matches && (
                <IconButton
                  aria-label="search"
                  className={classes.icon}
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              )
            )}
            {/*TODO:추후 알림이 있을 때만 검은색(classes.icon)으로 강조되게끔한다.*/}
            <IconButton
              aria-label="show new notifications"
              className={classes.icon}
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="user menu"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              className={classes.icon}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <AccountMenu
        menuId={menuId}
        accountEl={accountEl}
        handleMenuClose={handleMenuClose}
        isMenuOpen={isMenuOpen}
      />
      <Drawer open={drawer} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Header;
