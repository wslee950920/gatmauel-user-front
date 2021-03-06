import React, { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import loadable from "@loadable/component";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";

import Circular from "../../common/Circular";
const ListItemLink = loadable(() => import("../ListItemLink"));

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
  info: {
    margin: theme.spacing(2, 1, 0),
    flex: 1,
    color: theme.palette.secondary.dark,
  },
  box: {
    display: "flex",
    alignItems: "baseline",
  },
  more: {
    marginRight: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(0.8),
  },
}));

const NoticeList = ({ notices, error, loading }) => {
  const classes = useStyles();

  const kTime = useCallback((time) => {
    const temp = new Date(time);
    const year = temp.getFullYear().toString().substr(2, 2);
    const month = temp.getMonth() + 1;
    const date = temp.getDate();

    return `${year}/${month}/${date}`;
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.padding}>
        <Container className={classes.background}>
          <div className={classes.box}>
            <Typography variant="subtitle1" className={classes.info}>
              Notice
            </Typography>
            <Link
              component={RouterLink}
              to="/notice"
              color="secondary"
              variant="caption"
              className={classes.more}
            >
              더 보기{">"}
            </Link>
          </div>
          <div>
            <List>
              {!loading && !error ? (
                <div style={{ height: 144 }}>
                  {notices.slice(0, 2).map((notice) => (
                    <ListItemLink
                      key={notice.id}
                      primary={notice.title}
                      to={`/notice/${notice.id}`}
                      secondary={kTime(notice.createdAt)}
                    />
                  ))}
                </div>
              ) : (
                <Circular
                  container={{
                    height: 144,
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

export default React.memo(NoticeList);
