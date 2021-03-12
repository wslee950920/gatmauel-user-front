import React from "react";

import HeaderCon from "../../containers/main/HeaderCon";
import MainCon from "../../containers/main/MainCon";
import Footer from "../../components/footer";

const MainPage = () => {
  return (
    <div style={{ position: "relative" }}>
      <HeaderCon />
      <MainCon />
      <Footer scroll />
    </div>
  );
};

export default MainPage;
