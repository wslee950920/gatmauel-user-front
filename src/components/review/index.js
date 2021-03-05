import React, {
  useCallback,
  useMemo,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import loadable from "@loadable/component";
import { useLocation } from "react-router-dom";
import querystring from "querystring";

import List from "react-virtualized/dist/commonjs/List";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";
import CellMeasurer, {
  CellMeasurerCache,
} from "react-virtualized/dist/commonjs/CellMeasurer";

import { StepProvider } from "./context/step";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import EditReview from "./EditReview";
import ReviewItem from "./ReviewItem";
const Fab = loadable(() => import("../common/Fab"));
const DeleteDialog = loadable(() => import("./Delete"));
const FullScreenDialog = loadable(() => import("./FullScreenDialog"));

const WrappedItem = forwardRef((props, ref) => {
  return <ReviewItem {...props} forwardedRef={ref} />;
});

const Review = ({
  reviews,
  content,
  imgs,
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
  order,
  hashtagOnClick,
  hashtagUpdate,
}) => {
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const bSmall = useMediaQuery(theme.breakpoints.between(400, "sm"));
  const location = useLocation();
  const prev = useRef(null);

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
              hashtagOnClick={hashtagOnClick}
            />
          )}
        </CellMeasurer>
      );
    },
    [reviews, user, feedUpdate, openRemove, cache, isRowLoaded, hashtagOnClick]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const url = location.search.split("?")[1];
    const query = querystring.parse(url);

    if (query.index) {
      let scroll = 0;
      if (prev.current !== query.index) {
        for (let i = 0; i < query.index; i++) {
          scroll += cache.getHeight(i);
        }
        window.scroll({
          left: 0,
          top: scroll + 135,
          behavior: "smooth",
        });
        prev.current = query.index;
      }
    }
  }, [location, cache]);

  return (
    <>
      <StepProvider datas={reviews}>
        <EditReview
          handleClickOpen={handleClickOpen}
          rOnly
          imgs={imgs}
          handleFileRemove={handleFileRemove}
          content={content}
          onSubmit={onSubmit}
          onCamera={onCamera}
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
            <WindowScroller serverWidth={600} serverHeight={2700}>
              {({ height, isScrolling, scrollTop, onChildScroll }) => {
                return (
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
                    isScrolling={isScrolling}
                    style={{ width: "100%" }}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    overscanRowCount={8}
                    onRowsRendered={onRowsRendered}
                    deferredMeasurementCache={cache}
                    onScroll={onChildScroll}
                    ref={registerChild}
                  />
                );
              }}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </StepProvider>
      {user && (
        <>
          <FullScreenDialog
            open={open}
            handleClose={handleClose}
            hashtagUpdate={hashtagUpdate}
          />
          <DeleteDialog
            rOpen={rOpen}
            closeRemove={closeRemove}
            feedRemove={feedRemove}
          />
        </>
      )}
      <Fab order={order} />
    </>
  );
};

export default React.memo(Review);
