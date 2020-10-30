import React from "react";

import Register from "../../components/register";
import Header from "../../components/header";
import Copyright from "../../components/footer/Copyright";

const RegisterPage = () => {
  return (
    <>
      <Header main />
      <Register />
      <Copyright />
    </>
  );
};

export default RegisterPage;
