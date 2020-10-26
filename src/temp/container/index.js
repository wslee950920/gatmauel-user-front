import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getReviews } from "../../module/reviews";
import { Preloader } from "../../lib/PreloadContext";

import Temp from "../component";

const TempContainer = ({ reviews, getReviews }) => {
  useEffect(() => {
    //여기에서는 처음 api호출을 하는거니까 if(reviews)절이 필요 없다.
    getReviews();
  }, [getReviews, reviews]);

  return (
    <>
      <Temp reviews={reviews} />
      <Preloader resolve={getReviews} />
    </>
  );
};

export default connect(
  (state) => ({
    reviews: state.reviews.reviews,
  }),
  {
    getReviews,
  }
)(TempContainer);
