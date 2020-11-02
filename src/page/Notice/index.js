import React from "react";
import { Route } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Header from "../../components/header";
import NoticeCon from "../../containers/notice/NoticeCon";
import SearchBar from "../../components/common/SearchBar";
import ReadNoticeCon from "../../containers/notice/ReadNoticeCon";
import Footer from "../../components/footer";

import usePlatform from "../../lib/usePlatform";

const NoticePage = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const platform = usePlatform();

  return (
    <>
      <Header />
      {!matches && (
        <Route exact path={match.url} component={() => <SearchBar notice />} />
      )}
      <Route exact path={match.url} component={NoticeCon} />
      <Route path={`${match.url}/:id`} component={ReadNoticeCon} />
      {platform ? null : <Footer />}
    </>
  );
};

export default NoticePage;
