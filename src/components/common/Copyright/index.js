import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <Typography
      variant="caption"
      color="textSecondary"
      align="center"
      component={"p"}
    >
      {"Copyright 2020. "}
      <Link color="inherit" href="mailto:wslee950920@gmail.com">
        WSL
      </Link>
      {". All rights reserved."}
    </Typography>
  );
};

export default Copyright;
