import React from "react";

import HeaderCon from "../../containers/main/HeaderCon";
import AccountCon from "../../containers/user/AccountCon";
import Copyright from "../../components/footer/Copyright";

const AccountPage = () => {
  return (
    <>
      <HeaderCon />
      <AccountCon />
      <Copyright />
    </>
  );
};

export default AccountPage;
