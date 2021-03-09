import React from "react";

import FindCon from "../../containers/auth/FindCon";
import HeaderCon from "../../containers/main/HeaderCon";
import Copyright from "../../components/footer/Copyright";

const FindPage = () => {
  return (
    <>
      <HeaderCon />
      <FindCon />
      <Copyright />
    </>
  );
};

export default FindPage;
