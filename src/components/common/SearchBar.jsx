import React from "react";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root:{
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  toolbar: {
    width: "100%",
    position: "fixed",
    zIndex: theme.zIndex.appBar-1,
    backgroundColor: "#fafafa",
    maxWidth:theme.breakpoints.values.sm
  },
  search: {
    position: "relative",
    borderRadius: "25rem",
    border: "solid #dcdcdc",
    width: "100%",
    backgroundColor: "white",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    fontFamily: "Roboto",
  },
}));

const SearchBar = ({ hashtag, address, onChange, value }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar} style={address&&{backgroundColor:'white'}}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon fontSize="default" />
          </div>
          <InputBase
            placeholder={hashtag?"Hashtag...":address?"도로명주소(ex:일월로...)":"Search..."}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 
              "aria-label": "search", 
              type:'search',
            }}
            {...(address&&{
              autoFocus:true
            })}
            value={value}
            onChange={onChange}
            required
          />
        </div>
      </Toolbar>
      <Toolbar disableGutters/>
    </div>
  );
};

export default React.memo(SearchBar);
