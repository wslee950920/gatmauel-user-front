import React, { useState, useCallback } from "react";

import Grid from "@material-ui/core/Grid";

import CarouselView from "./CarouselView";
import ReviewList from "./ReviewList";
import CarouselMenu from "./CarouselMenu";
import CardDialog from "./CardDialog";
import NoticeList from "./NoticeList";

const Main = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <CarouselView />
      <Grid container>
        <Grid item xs={12} md={6}>
          <NoticeList />
          <ReviewList />
        </Grid>
        <Grid item xs={12} md={6}>
          <CarouselMenu handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <CardDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Main;
