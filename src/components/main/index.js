import React, { useState, useCallback, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import CarouselView from "./CarouselView";
import ReviewList from "./ReviewList";
import CarouselMenu from "./CarouselMenu";
import CardDialog from "../common/CardDialog";
import NoticeList from "./NoticeList";
import Fab from "../common/Fab";

const Main = ({ reviews, notices, food, order }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpen = useCallback((i) => {
    setOpen(true);
    setIndex(i);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CarouselView />
      <Grid container>
        <Grid item xs={12} md={6}>
          <NoticeList notices={notices} />
          <ReviewList reviews={reviews} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CarouselMenu handleOpen={handleOpen} food={food} />
        </Grid>
      </Grid>
      {food && (
        <CardDialog open={open} handleClose={handleClose} food={food[index]} />
      )}
      <Fab order={order} />
    </>
  );
};

export default React.memo(Main);
