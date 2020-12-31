import React from "react";

import HeaderCon from "../../containers/HeaderCon";
import Menu from "../../components/menu";
import MenuFooter from "../../components/footer/MenuFooter";

const MenuPage = () => {
  return (
    <>
      <HeaderCon main />
      <Menu />
      <MenuFooter />
    </>
  );
};

export default MenuPage;
