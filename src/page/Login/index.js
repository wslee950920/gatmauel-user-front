import React from "react";

import LoginCon from "../../containers/auth/LoginCon";
import HeaderCon from "../../containers/main/HeaderCon";
import Copyright from "../../components/footer/Copyright";

const LoginPage = () => {
  return (
    <>
      <HeaderCon main />
      <LoginCon />
      <Copyright />
    </>
  );
};

export default LoginPage;
