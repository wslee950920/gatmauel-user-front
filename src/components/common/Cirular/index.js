import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Circular = ({ height }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ height }}>
      <CircularProgress size={30} />
    </div>
  );
};

export default React.memo(Circular);
