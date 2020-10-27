import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getReviews } from "../../module/reviews";
import { getNotices } from "../../module/notices";
import { Preloader } from "../../lib/PreloadContext";

import Temp from "../component";

const TempContainer = ({ reviews, getReviews, notices, getNotices }) => {
  useEffect(() => {
    //여기에서는 처음 api호출을 하는거니까 if(reviews)절이 필요 없다.
    getReviews();
    getNotices();
  }, [getReviews, getNotices]);

  return (
    <>
      <Temp reviews={reviews} notices={notices} />
      <Preloader resolve={getReviews} />
      <Preloader resolve={getNotices} />
    </>
  );
};

export default connect(
  (state) => ({
    reviews: state.reviews.reviews,
    notices: state.notices.notices,
  }),
  {
    getReviews,
    getNotices,
  }
)(TempContainer);
