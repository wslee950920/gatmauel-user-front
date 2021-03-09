import React from "react";

import ProfileCon from "../../containers/user/ProfileCon";
import HeaderCon from "../../containers/main/HeaderCon";
import Copyright from "../../components/footer/Copyright";

const ProfilePage = () => {
  return (
    <>
      <HeaderCon />
      <ProfileCon />
      <Copyright />
    </>
  );
};

export default ProfilePage;
