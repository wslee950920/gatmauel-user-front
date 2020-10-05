import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Header from "../../components/header";
import Review from "../../components/review";
import SearchBar from "../../components/common/SearchBar";

const ReviewPage = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Header />
      {!small && <SearchBar />}
      <Review />
    </>
  );
};

export default ReviewPage;
