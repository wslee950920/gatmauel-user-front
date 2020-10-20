import React from "react";

import ListItem from "@material-ui/core/ListItem";
import { useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Feed from "./Feed";

const ReviewItem = ({ data, style, index, forwardedRef }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <ListItem style={style} ref={forwardedRef}>
        <CssBaseline />
        <Container maxWidth="sm" disableGutters={!matches}>
          <Feed data={data} index={index}/>
        </Container>
      </ListItem>
    </>
  );
};

export default React.memo(ReviewItem);
