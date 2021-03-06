import React from "react";
import { Route } from "react-router-dom";

import HeaderCon from "../../containers/main/HeaderCon";
import NoticeCon from "../../containers/notice/NoticeCon";
import Footer from "../../components/footer";
import ReadNoticeCon from "../../containers/notice/ReadNoticeCon";

const NoticePage = ({ match }) => {
  return (
    <div style={{ height: "100vh" }}>
      <HeaderCon />
      <Route exact path={match.url} component={NoticeCon} />
      <Route path={`${match.url}/:id`} component={ReadNoticeCon} />
      <Footer />
    </div>
  );
};

export default React.memo(NoticePage);
