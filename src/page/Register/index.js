import React from "react";

import RegisterCon from "../../containers/auth/RegisterCon";
import Header from "../../components/header";
import Copyright from "../../components/footer/Copyright";

const RegisterPage = () => {
  return (
    <>
      <Header main />
      <RegisterCon />
      <Copyright />
    </>
  );
};

export default RegisterPage;
