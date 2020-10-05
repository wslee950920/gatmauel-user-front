import React from "react";
<<<<<<< HEAD
import clsx from "clsx";
//import useWindowDimensions from "../../lib/windowDimensions";
=======
>>>>>>> search-v1.0

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(0, 1),
    position: "fixed",
    zIndex: theme.zIndex.appBar,
    backgroundColor: "#fafafa",

    [theme.breakpoints.up("sm")]: {
      backgroundColor: "#fff",
      position: "static",
    },
  },
  search: {
    position: "relative",
    borderRadius: "25rem",
    border: "solid #dcdcdc",
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
<<<<<<< HEAD
=======
    fontSize: "1rem",
>>>>>>> search-v1.0

    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

const SearchBar = ({ handleSearch, matches }) => {
  const classes = useStyles();
  const theme = useTheme();
  //const { height, width } = useWindowDimensions();

  /*const zoomOutMobile = useCallback(() => {
    var viewport = document.querySelector('meta[name="viewport"]');

    if (viewport) {
      viewport.setAttribute("content", `width=${width}`);
      viewport.setAttribute("content", "initial-scale=1");
    }
  }, [width]);*/

  return (
    <>
      <Toolbar className={classes.root} disableGutters>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon fontSize={"default"} />
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
            autoFocus={matches}
          />
        </div>
<<<<<<< HEAD
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onBlur={() => {
            //zoomOutMobile();
            setTimeout(handleSearch, theme.transitions.duration.shortest);
          }}
          autoFocus={matches}
        />
      </div>
    </div>
=======
      </Toolbar>
      {!matches && <Toolbar />}
    </>
>>>>>>> search-v1.0
  );
};

export default React.memo(SearchBar);
