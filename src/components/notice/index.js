import React, { useCallback, useMemo, useEffect } from "react";
import List from "react-virtualized/dist/commonjs/List";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";
import loadable from "@loadable/component";

import CssBaseline from "@material-ui/core/CssBaseline";

import Circular from "../common/Circular";
const NoticeItemLink = loadable(() => import("./NoticeItemLink"));
const Fab = loadable(() => import("../common/Fab"));

const Notice = ({ notices, hasNextPage, loadNextPage, loading, order }) => {
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
        <NoticeItemLink
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <InfiniteLoader
        rowCount={rowCount}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        threshold={1}
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
                height={height}
                rowCount={rowCount}
                rowHeight={100}
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowRenderer={rowRenderer}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                overscanRowCount={8}
                onScroll={onChildScroll}
              />
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
      <Fab order={order} />
    </>
  );
};

export default React.memo(Notice);
