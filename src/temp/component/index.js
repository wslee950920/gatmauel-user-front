import React, { useState, useCallback, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import CarouselView from "../../components/main/CarouselView";
import ReviewList from "./ReviewList";
import CarouselMenu from "../../components/main/CarouselMenu";
import CardDialog from "../../components/common/CardDialog";
import NoticeList from "../../components/main/NoticeList";

const Temp = ({ reviews }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
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
          <NoticeList />
          <ReviewList reviews={reviews} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CarouselMenu handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <CardDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default React.memo(Temp);
