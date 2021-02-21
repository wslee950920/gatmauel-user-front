import React from "react";

import ListItem from "@material-ui/core/ListItem";
import { useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Feed from "./Feed";
import LoadingItem from './LoadingItem';

const ReviewItem = ({ 
  data, 
  style, 
  index, 
  user, 
  feedUpdate, 
  openRemove, 
  measure, 
  forwardedRef,
  isRowLoaded,
  hashtagOnClick
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <ListItem style={style} ref={forwardedRef}>
      <CssBaseline />
      <Container maxWidth="sm" disableGutters={!matches}>
        {
          !isRowLoaded({index})?(
            <LoadingItem/>
          ):(
            <Feed 
              data={data} 
              index={index} 
              user={user} 
              feedUpdate={feedUpdate} 
              openRemove={openRemove}
              measure={measure}
              hashtagOnClick={hashtagOnClick}
            />
          )
        }
      </Container>
    </ListItem>
  );
};

export default React.memo(ReviewItem);
