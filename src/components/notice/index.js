import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import SearchBar from "../common/SearchBar";
import Footer from "../footer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&>li:last-child": {
      display: "none",
    },
  },
  inline: {
    display: "inline",
    fontFamily: "Roboto",
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    fontFamily: "MaplestoryOTFBold",
    whiteSpace: "pre-wrap",
  },
}));

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) =>
    React.cloneElement(element, { key: value })
  );
}

const Register = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const text = `Wish I could come, but I'm out of town this…\n주방 공사합니다.`; // prettier-ignore

  return (
    <>
      {!matches && <SearchBar />}
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <List className={classes.root}>
            {generate(
              <>
                <ListItem alignItems="flex-start">
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
                        {text}
                      </>
                    }
                    secondaryTypographyProps={{
                      variant: "body2",
                      className: classes.content,
                    }}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )}
          </List>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
