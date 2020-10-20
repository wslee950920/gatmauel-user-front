import React from "react";
import { Route } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Header from "../../components/header";
import Notice from "../../components/notice";
import SearchBar from "../../components/common/SearchBar";
import ReadNotice from "../../components/notice/ReadNotice";

const NoticePage = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Header />
      {!matches && <Route exact path={match.url} component={SearchBar} />}
      <Route exact path={match.url} component={Notice} />
      <Route path={`${match.url}/:id`} component={ReadNotice} />
    </>
  );
};

export default React.memo(NoticePage);
