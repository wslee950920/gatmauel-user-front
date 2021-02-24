import React from "react";

import FindCon from "../../containers/auth/FindCon";
import Header from "../../components/header";
import Copyright from "../../components/footer/Copyright";

const FindPage = () => {
  return (
    <>
      <Header main />
      <FindCon />
      <Copyright />
    </>
  );
};

export default FindPage;
