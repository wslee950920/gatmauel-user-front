import React from "react";

import HeaderCon from "../../containers/HeaderCon";
import MainCon from "../../containers/MainCon";
import Footer from "../../components/footer";

const MainPage = () => {
  return (
    <>
      <HeaderCon main />
      <MainCon />
      <Footer />
    </>
  );
};

export default MainPage;
