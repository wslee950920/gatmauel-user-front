import React from "react";

import RWView from "../../common/RWView";

const ReadNotice = ({ notice }) => {
  return <RWView view rOnly data={notice} />;
};

export default React.memo(ReadNotice);
