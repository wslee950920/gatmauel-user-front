import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import ListItemText from "@material-ui/core/ListItemText";
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

const NoticeLitemLink = ({ data, style }) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={data.to} ref={ref} {...itemProps} />
      )),
    [data.to]
  );

  return (
    <div style={style}>
      <ListItem alignItems="flex-start" divider button component={renderLink}>
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

export default React.memo(NoticeLitemLink);
