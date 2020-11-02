import React from "react";
import clsx from "clsx";
import useWindowDimensions from "../../../lib/windowDimensions";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Head from "./Head";
import Tools from "./Tools";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    width: "100%",
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
    fontFamily: "MaplestoryOTFBold",
    backgroundColor: "white",
    padding: theme.spacing(2),
  },
  back: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const RWView = ({ handleClickOpen, rOnly, data }) => {
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        {...(data
          ? {
              style: {
                height:
                  height - 56 - 8 - 57.43 - parseInt(clsx(matches ? 8 : "0")),
              },
            }
          : {})}
      >
        <div className={classes.background}>
          {data && <Head title={data.title} time={data.createdAt} />}
          <TextareaAutosize
            aria-label="read-write-data"
            rowsMin={clsx(data ? 16 : 4)}
            rowsMax={clsx(data ? 16 : !rOnly ? 10 : 4)}
            className={classes.textArea}
            onClick={handleClickOpen}
            readOnly={rOnly}
            value={data && data.content}
            {...(data
              ? {
                  style: {
                    fontFamily: "Roboto",
                  },
                }
              : {})}
            autoFocus={!data && !rOnly}
          />
          {!data && <Tools />}
        </div>
        {rOnly && data && (
          <div className={classes.back}>
            <Link
              to="/notice"
              style={{
                fontFamily: "Roboto",
                color: theme.palette.text.secondary,
              }}
            >
              돌아가기
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default React.memo(RWView);
