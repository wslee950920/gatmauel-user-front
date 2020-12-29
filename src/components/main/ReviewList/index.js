import React from "react";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";

import ListItemLink from "../../common/MainLists/ListItemLink";
import Circular from "../../common/Circular";

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
  more: {
    marginRight: theme.spacing(1),
  },
}));

const ReviewList = ({ reviews }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div style={{ padding: theme.spacing(0.8) }}>
        <Container className={classes.background}>
          <div className={classes.box}>
            <Typography variant="subtitle1" className={classes.title} noWrap>
              Review
            </Typography>
            <Link
              component={RouterLink}
              to="/review"
              color="secondary"
              variant="caption"
              className={classes.more}
            >
              더 보기{">"}
            </Link>
          </div>
          <div>
            <List>
              {reviews.length > 0 ? (
                <div style={{ height: 192 }}>
                  {reviews.slice(0, 4).map((review, index) => (
                    <ListItemLink
                      key={review.id}
                      primary={review.content}
                      to={`/review?index=${index}`}
                      review
                    />
                  ))}
                </div>
              ) : (
                <Circular
                  container={{
                    height: 192,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              )}
            </List>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default React.memo(ReviewList);
