import React from "react";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
    fontFamily: "Roboto",
  },
  content: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

const ReviewItem = ({ data, style }) => {
  const classes = useStyles();

  return (
    <div style={style}>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="갯마을" src="logo192.png" />
        </ListItemAvatar>
        <ListItemText
          primary="공지사항 제목"
          secondary={
            <>
              <Typography
                component="span"
                variant="caption"
                className={classes.inline}
                color="textPrimary"
              >
                20/09/27
              </Typography>
              <br />
              {data.text}
            </>
          }
          secondaryTypographyProps={{
            variant: "body2",
            className: classes.content,
            noWrap: true,
          }}
        />
      </ListItem>
    </div>
  );
};

export default React.memo(ReviewItem);
