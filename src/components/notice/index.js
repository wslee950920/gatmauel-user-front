import React, { useCallback, useMemo } from "react";
import List from "react-virtualized/dist/commonjs/List";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import NoticeLitemLink from "./NoticeLitemLink";
import Circular from "../common/Circular";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const Notice = ({ notices, hasNextPage, loadNextPage, loading }) => {
  const classes = useStyles();

  const rowCount = useMemo(
    () => (hasNextPage ? notices.length + 1 : notices.length),
    [hasNextPage, notices]
  );
  const loadMoreRows = useMemo(
    () =>
      loading
        ? () => {
            console.log("already loading...");
          }
        : loadNextPage,
    [loading, loadNextPage]
  );

  const isRowLoaded = useCallback(
    ({ index }) => !hasNextPage || index < notices.length,
    [hasNextPage, notices]
  );
  const rowRenderer = useCallback(
    ({ index, style, key }) => {
      return isRowLoaded({ index }) ? (
        <NoticeLitemLink
          data={notices[index]}
          style={style}
          index={index}
          length={notices.length}
          key={key}
        />
      ) : (
        <div style={style} key={key}>
          <CssBaseline />
          <Circular
            container={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      );
    },
    [notices, isRowLoaded]
  );

  return (
    <InfiniteLoader
      rowCount={rowCount}
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      threshold={2}
    >
      {({ onRowsRendered, registerChild }) => (
        <WindowScroller serverHeight={1100} serverWidth={600}>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <List
              autoHeight
              autoWidth
              width={1}
              containerStyle={{
                width: "100%",
                maxWidth: "100%",
              }}
              style={{ width: "100%", minHeight: "calc(100vh - 129.57px)" }}
              className={classes.root}
              height={height}
              rowCount={rowCount}
              rowHeight={100}
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              overscanRowCount={6}
              scrollToAlignment="start"
              onScroll={onChildScroll}
            />
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};

export default React.memo(Notice);
