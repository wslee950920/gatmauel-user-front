import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  forwardRef,
} from "react";
import {
  List,
  WindowScroller,
  InfiniteLoader,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
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
import Circular from "../common/Circular";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const WrappedItem = forwardRef((props, ref) => {
  return <ReviewItem {...props} forwardedRef={ref} />;
});

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
      return 816;
    } else if (bSmall) {
      return 609;
    } else if (xSmall) {
      return 559;
    } else return 504;
  }, [small, bSmall, xSmall]);
  const cache = new CellMeasurerCache({
    defaultHeight: rowHeight,
    fixedWidth: true,
  });
  const loadMoreRows = useMemo(() => {
    return loading
      ? () => {
          console.log("loadMoreRows", loading);
        }
      : loadNextPage;
  }, [loading, loadNextPage]);

  const isRowLoaded = useCallback(
    ({ index }) => {
      //console.log("isRowLoaded", index, hasNextPage, reviews.length);
      return !hasNextPage || index + 1 < reviews.length;
    },
    [hasNextPage, reviews]
  );
  const rowRenderer = useCallback(
    ({ index, key, style, parent }) => {
      //console.log("rowRenderer", !isRowLoaded({ index }));
      const data = reviews[index];

      return !isRowLoaded({ index }) ? (
        <Circular style={style} key={key} height={40} />
      ) : (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) => (
            <WrappedItem
              ref={registerChild}
              data={data}
              style={style}
              user={user}
              feedUpdate={feedUpdate}
              openRemove={openRemove}
              measure={measure}
            />
          )}
        </CellMeasurer>
      );
    },
    [reviews, user, feedUpdate, openRemove, cache, isRowLoaded]
  );

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
          threshold={6}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <List
                  autoHeight
                  height={height - 56 - 8 - clsx(small ? 0 : 37.09) - 8}
                  rowCount={reviews.length}
                  rowHeight={cache.rowHeight}
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
                  deferredMeasurementCache={cache}
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
