import React from "react";

import HeaderCon from "../../containers/HeaderCon";
import MainCon from "../../containers/MainCon";
import Footer from "../../components/footer";

const MainPage = () => {
  return (
    <div style={{ position: "relative" }}>
      <HeaderCon main />
      <MainCon />
      <Footer main />
    </div>
  );
};

export default MainPage;
