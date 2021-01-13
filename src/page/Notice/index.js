import React from "react";
import { Route } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import HeaderCon from "../../containers/main/HeaderCon";
import NoticeCon from "../../containers/notice/NoticeCon";
import SearchBar from "../../components/common/SearchBar";
import ReadNoticeCon from "../../containers/notice/ReadNoticeCon";
import Footer from "../../components/footer";

const NoticePage = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div style={{ height: "100vh" }}>
      <HeaderCon />
      {!matches && (
        <Route exact path={match.url} component={() => <SearchBar notice />} />
      )}
      <Route exact path={match.url} component={NoticeCon} />
      <Route path={`${match.url}/:id`} component={ReadNoticeCon} />
      <Footer />
    </div>
  );
};

export default NoticePage;
