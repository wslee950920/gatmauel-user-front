import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      flex: 1,
    },
  },
  background: {
    backgroundColor: "white",
    border: "solid #dcdcdc",
    borderRadius: "8px",
  },
  title: {
    margin: theme.spacing(2, 1, 0),
    flex: 1,
  },
  content: {
    fontSize: "0.7rem",
    color: "#808080",
  },
  box: {
    display: "flex",
    alignItems: "baseline",
  },
  primary: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

function generate(element) {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const ReviewList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div style={{ padding: "0.4rem" }}>
        <Container maxWidth="xl" className={classes.background}>
          <div className={classes.box}>
            <Typography variant="subtitle1" className={classes.title} noWrap>
              Review
            </Typography>
            <Link href="#" color="secondary" variant="caption">
              더 보기{">"}
            </Link>
          </div>
          <div>
            <List>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="맛잇어요!!!"
                    primaryTypographyProps={{
                      color: "textSecondary",
                    }}
                    classes={{ primary: classes.primary }}
                  />
                </ListItem>
              )}
            </List>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ReviewList;
