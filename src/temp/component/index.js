import React, { useState, useCallback, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import CarouselView from "../../components/main/CarouselView";
import ReviewList from "./ReviewList";
import NoticeList from "./NoticesList";
import CarouselMenu from "../../components/main/CarouselMenu";
import CardDialog from "../../components/common/CardDialog";

const Temp = ({ reviews, notices }) => {
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
          <NoticeList notices={notices} />
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
