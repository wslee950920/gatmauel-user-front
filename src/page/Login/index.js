import React from "react";

import LoginCon from "../../containers/auth/LoginCon";
import HeaderCon from "../../containers/main/HeaderCon";
import Copyright from "../../components/footer/Copyright";

const LoginPage = () => {
  return (
    <>
      <HeaderCon />
      <LoginCon />
      <Copyright />
    </>
  );
};

export default LoginPage;
