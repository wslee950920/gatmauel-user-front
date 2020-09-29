import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MapIcon from "@material-ui/icons/Map";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";

const selectIcon = (text) => {
  if (text === "홈") {
    return <HomeIcon />;
  } else if (text === "리뷰") {
    return <RateReviewIcon />;
  } else if (text === "주문하기") {
    return <LocalShippingIcon />;
  } else if (text === "오시는길") {
    return <MapIcon />;
  } else if (text === "메뉴") {
    return <RestaurantMenuIcon />;
  } else if (text === "공지사항") {
    return <NotificationImportantIcon />;
  }
};

export default selectIcon;
