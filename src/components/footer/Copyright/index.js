import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const Copyright = () => {
  return (
    <Container component="footer" maxWidth="xs">
      <Box mt={5} mb={5}>
        <Typography
          variant="caption"
          color="textSecondary"
          align="center"
          component={"p"}
        >
          {"Copyright 2020. "}
          <Link color="inherit" href="mailto:gatmauel9300@gmail.com">
            WSL
          </Link>
          {". All rights reserved."}
        </Typography>
      </Box>
    </Container>
  );
};

export default Copyright;
