import React from "react";

import HeaderCon from "../../containers/main/HeaderCon";
import ResultCon from "../../containers/result/ResultCon";
import Footer from "../../components/footer";

const ResultPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <HeaderCon main />
      <ResultCon />
      <Footer map />
    </div>
  );
};

export default ResultPage;
