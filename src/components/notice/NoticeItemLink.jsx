import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import useTime from "../../lib/useTime";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
    fontFamily: "Roboto",
  },
  content: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

const NoticeLitemLink = ({ data, style, index, length }) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={`/notice/${data.id}`} ref={ref} {...itemProps} />
      )),
    [data]
  );
  const divider = useMemo(() => {
    if (index !== length - 1) return true;
    else return false;
  }, [index, length]);

  return (
    <div style={style}>
      <CssBaseline />
      <Container maxWidth="sm">
        <ListItem divider={divider} button component={renderLink}>
          <ListItemText
            primary={data.title}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {useTime(data.createdAt)}
                </Typography>
                <br />
                {data.content}
              </>
            }
            secondaryTypographyProps={{
              variant: "body2",
              className: classes.content,
              noWrap: true,
            }}
          />
        </ListItem>
      </Container>
    </div>
  );
};

export default React.memo(NoticeLitemLink);
