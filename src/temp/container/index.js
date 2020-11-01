import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getReviews } from "../../modules/reviews";
import { getNotices } from "../../modules/notices";
import { Preloader, usePreloader } from "../../lib/PreloadContext";

import Temp from "../component";
import Header from "../../components/header";
import Footer from "../../components/footer";

const TempContainer = ({ reviews, getReviews, notices, getNotices }) => {
  useEffect(() => {
    //여기에서는 처음 api호출을 하는거니까 if(reviews)절이 필요 없다.
    getReviews();
    getNotices();
  }, [getReviews, getNotices]);
  usePreloader(getNotices);

  return (
    <>
      <Header main />
      <Temp reviews={reviews} notices={notices} />
      <Footer />
      <Preloader resolve={getReviews} />
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
