import React from "react";

import ListItem from "@material-ui/core/ListItem";
import { useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Feed from "./Feed";

const ReviewItem = ({ data, style, index, user, feedUpdate, feedRemove}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <ListItem style={style}>
        <CssBaseline />
        <Container maxWidth="sm" disableGutters={!matches}>
          <Feed data={data} index={index} user={user} feedUpdate={feedUpdate} feedRemove={feedRemove}/>
        </Container>
      </ListItem>
    </>
  );
};

export default React.memo(ReviewItem);
