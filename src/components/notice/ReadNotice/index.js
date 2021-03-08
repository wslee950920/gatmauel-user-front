import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Head from "./Head";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    width: "100%",
    height: `calc(100vh - 129.57px)`,

    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 138px)",
    },
  },
  background: {
    backgroundColor: "white",
    border: "thin solid #dcdcdc",
    borderRadius: "2px",
    width: "100%",
  },
  textArea: {
    width: "100%",
    border: "none",
    fontSize: "1rem",
    fontFamily: "Roboto",
    backgroundColor: "white",
    padding: theme.spacing(2),
  },
  back: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
  },
  fontRobo: {
    fontFamily: "Roboto",
    color: theme.palette.text.secondary,
  },
}));

const ReadNotice = ({ notice }) => {
  const classes = useStyles();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.background}>
          <Head title={notice.title} time={notice.createdAt} />
          <TextareaAutosize
            aria-label="read-data"
            rowsMin={16}
            rowsMax={16}
            className={classes.textArea}
            readOnly
            value={notice.content}
          />
        </div>
        <div className={classes.back}>
          <Link to="/notice" className={classes.fontRobo}>
            돌아가기
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(ReadNotice);
