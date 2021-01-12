import React, { useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import clsx from "clsx";
import InfiniteLoader from "react-window-infinite-loader";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const itemCount = useMemo(
    () => (hasNextPage ? notices.length + 1 : notices.length),
    [hasNextPage, notices]
  );
  const loadMoreItems = useMemo(
    () =>
      loading
        ? () => {
            console.log("already loading...");
          }
        : loadNextPage,
    [loading, loadNextPage]
  );

  const isItemLoaded = useCallback(
    (index) => {
      return !hasNextPage || index < notices.length;
    },
    [hasNextPage, notices, loading, loadNextPage]
  );
  const Row = useCallback(
    ({ index, style }) => {
      return isItemLoaded(index) ? (
        <NoticeLitemLink
          data={notices[index]}
          style={style}
          index={index}
          length={notices.length}
        />
      ) : (
        <div style={style}>
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
    [notices, isItemLoaded]
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          itemCount={itemCount}
          isItemLoaded={isItemLoaded}
          loadMoreItems={loadMoreItems}
          threshold={9}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className={classes.root}
              height={height - 56 - 8 - clsx(matches ? 0 : 37.09) - 8 - 57.43}
              itemCount={itemCount}
              itemSize={100}
              width={width}
              ref={ref}
              onItemsRendered={onItemsRendered}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default React.memo(Notice);
