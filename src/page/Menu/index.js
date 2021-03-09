import React from "react";

import HeaderCon from "../../containers/main/HeaderCon";
import MenuCon from "../../containers/menu/MenuCon";
import MenuFooter from "../../components/footer/MenuFooter";

const MenuPage = () => {
  return (
    <>
      <HeaderCon />
      <MenuCon />
      <MenuFooter />
    </>
  );
};

export default MenuPage;
