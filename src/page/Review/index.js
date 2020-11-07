import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import HeaderCon from "../../containers/HeaderCon";
import ReviewCon from "../../containers/review/ReviewCon";
import SearchBar from "../../components/common/SearchBar";

const ReviewPage = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <HeaderCon />
      {!small && <SearchBar />}
      <ReviewCon />
    </>
  );
};

export default ReviewPage;
