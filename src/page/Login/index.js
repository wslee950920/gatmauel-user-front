import React from "react";

import LoginCon from "../../containers/auth/LoginCon";
import Header from "../../components/header";
import Copyright from "../../components/footer/Copyright";

const LoginPage = () => {
  return (
    <>
      <Header main />
      <LoginCon />
      <Copyright />
    </>
  );
};

export default LoginPage;
