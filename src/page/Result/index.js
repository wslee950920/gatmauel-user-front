import React from "react";
import { Route } from "react-router-dom";

import ResultCon from "../../containers/result/ResultCon";
import ReasonCon from "../../containers/result/ReasonCon";

const ResultPage = ({ match }) => {
  return (
    <>
      <Route exact path={match.url} component={ResultCon} />
      <Route path={`${match.url}/:reason`} component={ReasonCon} />
    </>
  );
};

export default React.memo(ResultPage);
