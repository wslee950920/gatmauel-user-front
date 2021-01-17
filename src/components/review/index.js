import React, {
  useRef,
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useEffect,
} from "react";
import loadable from "@loadable/component";

import List from "react-virtualized/dist/commonjs/List";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";
import CellMeasurer, {
  CellMeasurerCache,
} from "react-virtualized/dist/commonjs/CellMeasurer";

import { StepProvider } from "./context/step";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewItem from "./ReviewItem";
import FullScreenDialog from "./FullScreenDialog";
import EditReview from "./EditReview";
import Fab from "../common/Fab";
const DeleteDialog = loadable(() => import("./Delete"));

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
  gloading,
  hasNextPage,
  progress,
  wloading,
  scrollToIndex,
  order,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const bSmall = useMediaQuery(theme.breakpoints.between(400, "sm"));
  const inputId = useRef("review-file-input");
  const [scrollIndex, setScrollIndex] = useState(-1);
  const listRef = useRef(null);

  const rowHeight = useMemo(() => {
    if (small) {
      return 816;
    } else if (bSmall) {
      return 609;
    } else if (xSmall) {
      return 559;
    } else return 504;
  }, [small, bSmall, xSmall]);
  const loadMoreRows = useMemo(() => {
    return gloading
      ? () => {
          console.log("already loading...");
        }
      : loadNextPage;
  }, [gloading, loadNextPage]);
  const rowCount = useMemo(() => {
    return hasNextPage ? reviews.length + 1 : reviews.length;
  }, [hasNextPage, reviews]);

  const cache = new CellMeasurerCache({
    defaultHeight: rowHeight,
    fixedWidth: true,
  });

  const clearScrollToIndex = useCallback(() => {
    setScrollIndex(-1);
  }, []);
  const isRowLoaded = useCallback(
    ({ index }) => {
      return !hasNextPage || index < reviews.length;
    },
    [hasNextPage, reviews]
  );
  const rowRenderer = useCallback(
    ({ index, key, style, parent }) => {
      return (
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
              data={reviews[index]}
              style={style}
              user={user}
              feedUpdate={feedUpdate}
              openRemove={openRemove}
              measure={measure}
              index={index}
              isRowLoaded={isRowLoaded}
            />
          )}
        </CellMeasurer>
      );
    },
    [reviews, user, feedUpdate, openRemove, cache, isRowLoaded]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (scrollToIndex >= 0) {
      const offset = listRef.current.getOffsetForRow({
        alignment: "start",
        index: scrollToIndex,
      });
      if (offset > -1) {
        window.scrollTo(0, offset + 135);

        return;
      }
    }

    setScrollIndex(scrollToIndex);
  }, [scrollToIndex]);

  return (
    <>
      <StepProvider datas={reviews}>
        <div className={classes.paper}>
          <EditReview
            handleClickOpen={handleClickOpen}
            rOnly
            imgs={imgs}
            handleFileOnChange={handleFileOnChange}
            handleFileRemove={handleFileRemove}
            content={content}
            onSubmit={onSubmit}
            onCamera={onCamera}
            inputId={inputId.current}
            loading={wloading}
            progress={progress}
          />
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
            threshold={8}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller
                serverWidth={600}
                serverHeight={2700}
                onScroll={clearScrollToIndex}
                ref={registerChild}
              >
                {({ height, isScrolling, scrollTop, onChildScroll }) => (
                  <List
                    autoHeight
                    autoWidth
                    height={height}
                    rowCount={rowCount}
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
                    deferredMeasurementCache={cache}
                    scrollToAlignment="center"
                    onScroll={onChildScroll}
                    scrollToIndex={scrollIndex}
                    ref={listRef}
                  />
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        </div>
        <FullScreenDialog open={open} handleClose={handleClose} />
      </StepProvider>
      {user && (
        <DeleteDialog
          rOpen={rOpen}
          closeRemove={closeRemove}
          feedRemove={feedRemove}
        />
      )}
      <Fab order={order} />
    </>
  );
};

export default React.memo(Review);
