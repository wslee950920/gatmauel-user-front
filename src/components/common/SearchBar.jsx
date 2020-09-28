import React from "react";
import clsx from "clsx";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0.8),
  },
  search: {
    position: "relative",
    borderRadius: "25rem",
    border: "solid #dcdcdc",
    marginTop: theme.spacing(1),
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(0.5),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    fontFamily: "Roboto",
    transition: theme.transitions.create("width"),
    fontSize: "0.9rem",

    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": { width: "20ch" },
      fontSize: "1rem",
    },
  },
}));

const SearchBar = ({ handleSearch }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon fontSize={clsx(matches ? "default" : "small")} />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onBlur={() =>
            setTimeout(handleSearch, theme.transitions.duration.shortest)
          }
          autoFocus
        />
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
