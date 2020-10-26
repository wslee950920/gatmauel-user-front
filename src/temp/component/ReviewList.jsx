import React from "react";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";

import ListItemLink from "../../components/common/MainLists/ListItemLink";

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
  //평소하던대로 &&연산자를 활용하여 렌더링하면 ssr에 포함되지 않아
  //브라우저 렌더링 화면이 깨진다.
  //그렇다고 아래에 null외에 다른 컴포넌트를 렌더링하면 ssr에 ListItem링크 외에
  //다른게 렌더링 되어 브라우저가 렌더링 할 때 화면이 깨진다.
  if (!reviews) {
    return null;
  }

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
              {reviews.slice(0, 4).map((review) => (
                <ListItemLink
                  key={review.id}
                  primary={review.content}
                  to="/review?id=2"
                  review
                />
              ))}
            </List>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default React.memo(ReviewList);
