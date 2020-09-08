import React, { useState, useCallback } from "react";
import loadable from "@loadable/component";

import { makeStyles } from "@material-ui/core/styles";

import CarouselView from "./CarouselView";
import ReviewList from "./ReviewList";
import CarouselMenu from "./CarouselMenu";
const CardDialog = loadable(() => import("./CardDialog"));

const useStyles = makeStyles((theme) => ({
  resp: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  },
}));

const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onMouseOver = useCallback(() => {
    CardDialog.preload();
  }, []);

  return (
    <>
      <CarouselView />
      <div className={classes.resp}>
        <ReviewList />
        <CarouselMenu handleOpen={handleOpen} onMouseOver={onMouseOver} />
      </div>
      {open && <CardDialog open={open} handleClose={handleClose} />}
    </>
  );
};

export default Main;
