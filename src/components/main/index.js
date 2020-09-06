import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CarouselView from "./CarouselView";
import ReviewList from "./ReviewList";
import CarouselMenu from "./CarouselMenu";

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

  return (
    <>
      <CarouselView />
      <div className={classes.resp}>
        <ReviewList />
        <CarouselMenu />
      </div>
    </>
  );
};

export default Main;
