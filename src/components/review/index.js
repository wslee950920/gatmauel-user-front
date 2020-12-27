import React, { useRef, useCallback, useMemo, useEffect } from "react";
import { List, WindowScroller, InfiniteLoader } from "react-virtualized";
import clsx from "clsx";
import "react-virtualized/styles.css"; // only needs to be imported once
import { StepProvider } from "./context/step";
import querystring from "querystring";
import url from "url";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewItem from "./ReviewItem";
import RWView from "../common/RWView";
import FullScreenDialog from "./FullScreenDialog";
import DeleteDialog from "./Delete";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const Review = ({
  reviews,
  content,
  imgs,
  handleFileOnChange,
  handleFileRemove,
  onSubmit,
  open,
  handleClose,
  handleClickOpen,
  onCamera,
  user,
  feedUpdate,
  feedRemove,
  rOpen,
  openRemove,
  closeRemove,
  loadNextPage,
  loading,
  hasNextPage,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const bSmall = useMediaQuery(theme.breakpoints.between(400, "sm"));
  const inputId = useRef("review-file-input");

  const rowHeight = useMemo(() => {
    if (small) {
      return 800;
    } else if (bSmall) {
      return 650;
    } else if (xSmall) {
      return 600;
    } else return 550;
  }, [small, bSmall, xSmall]);

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const data = reviews[index];

      return (
        <ReviewItem
          data={data}
          style={style}
          key={key}
          index={index}
          user={user}
          feedUpdate={feedUpdate}
          openRemove={openRemove}
        />
      );
    },
    [reviews, user, feedUpdate, openRemove]
  );
  const isRowLoaded = useCallback(
    ({ index }) => {
      console.log(index, hasNextPage);
      return !hasNextPage || index + 1 < reviews.length;
    },
    [hasNextPage, reviews]
  );

  const loadMoreRows = useMemo(() => {
    return loading
      ? () => {
          console.log("loadMoreRows", loading);
        }
      : loadNextPage;
  }, [loading, loadNextPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const parsedUrl = url.parse(window.location.href);
    const query = querystring.parse(parsedUrl.query);
    const empty =
      Object.keys(query).length === 0 && query.constructor === Object;
    if (!empty) {
      window.scrollTo({
        top: rowHeight * parseInt(query.index) + 181 + theme.spacing(4),
      });
    }
  }, [theme, rowHeight]);

  return (
    <StepProvider datas={reviews}>
      <div className={classes.paper}>
        <RWView
          handleClickOpen={handleClickOpen}
          rOnly
          imgs={imgs}
          handleFileOnChange={handleFileOnChange}
          handleFileRemove={handleFileRemove}
          content={content}
          onSubmit={onSubmit}
          onCamera={onCamera}
          inputId={inputId.current}
        />
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={reviews.length}
          threshold={2}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <List
                  autoHeight
                  height={height - 56 - 8 - clsx(small ? 0 : 37.09) - 8}
                  rowCount={reviews.length}
                  rowHeight={rowHeight}
                  width={1}
                  containerStyle={{
                    width: "100%",
                    maxWidth: "100%",
                  }}
                  style={{ width: "100%" }}
                  rowRenderer={rowRenderer}
                  scrollTop={scrollTop}
                  isScrolling={isScrolling}
                  overscanRowCount={4}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                />
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
      <FullScreenDialog open={open} handleClose={handleClose} />
      <DeleteDialog
        rOpen={rOpen}
        closeRemove={closeRemove}
        feedRemove={feedRemove}
      />
    </StepProvider>
  );
};

export default React.memo(Review);
