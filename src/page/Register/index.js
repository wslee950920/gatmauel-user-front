import React from "react";

import HeaderCon from "../../containers/main/HeaderCon";
import RegisterCon from "../../containers/auth/RegisterCon";
import Copyright from "../../components/footer/Copyright";

const RegisterPage = () => {
  return (
    <>
      <HeaderCon />
      <RegisterCon />
      <Copyright />
    </>
  );
};

export default RegisterPage;
