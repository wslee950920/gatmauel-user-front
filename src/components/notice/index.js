import React, { useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//import List from "@material-ui/core/List";

import SearchBar from "../common/SearchBar";
import Footer from "../footer";
import NoticeLitemLink from "./NoticeLitemLink";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&>li:last-child": {
      display: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Notice = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { height, width } = useWindowDimensions();
  const data = useRef({
    text: `Wish I could come, but I'm out of town this…주방 공사합니다.`,
    to: "#",
  });

  const Row = useCallback(({ index, style, data }) => {
    return <NoticeLitemLink data={data} index={index} style={style} />;
  }, []);

  return (
    <>
      {!matches && <SearchBar />}
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <List
            className={classes.root}
            height={height - 56 - 8 - clsx(matches ? 0 : 37.09) - 8 - 57.43}
            itemCount={1000}
            itemSize={100}
            width={clsx(matches ? theme.breakpoints.values.sm : width)}
            itemData={data.current}
          >
            {Row}
          </List>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Notice;
