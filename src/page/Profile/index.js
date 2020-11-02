import React from "react";

import ProfileCon from "../../containers/user/ProfileCon";
import HeaderCon from "../../containers/HeaderCon";
import Copyright from "../../components/footer/Copyright";

const ProfilePage = () => {
  return (
    <>
      <HeaderCon main />
      <ProfileCon />
      <Copyright />
    </>
  );
};

export default ProfilePage;
