import React from "react";

import TempCon from "./container";
import HeaderCon from "../containers/HeaderCon";
import Footer from "../components/footer";

const Templete = () => {
  return (
    <>
      <HeaderCon main />
      <TempCon />
      <Footer />
    </>
  );
};

export default Templete;
