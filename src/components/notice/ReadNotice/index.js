import React, { useRef } from "react";

import RWView from "../../common/RWView";
import Footer from "../../../components/footer";

const ReadNotice = () => {
  const data = useRef(
    `Wish I could come, but I'm out of town this…주방 공사합니다.`
  );

  return (
    <>
      <RWView view rOnly data={data.current} />
      <Footer />
    </>
  );
};

export default ReadNotice;
