import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  forwardRef,
} from "react";
import loadable from "@loadable/component";

import List from "react-virtualized/dist/commonjs/List";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";
import CellMeasurer, {
  CellMeasurerCache,
} from "react-virtualized/dist/commonjs/CellMeasurer";

import { StepProvider } from "./context/step";
import querystring from "querystring";
import url from "url";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewItem from "./ReviewItem";
import FullScreenDialog from "./FullScreenDialog";
import EditReview from "./EditReview";
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
        {/*threshold는 스크롤이 어느정도까지 왔을 때 데이터를 불러올지 설정한다. */}
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={rowCount}
          threshold={9}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <List
                  autoHeight
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
                  ref={registerChild}
                  deferredMeasurementCache={cache}
                />
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
      <FullScreenDialog open={open} handleClose={handleClose} />
      {user && (
        <DeleteDialog
          rOpen={rOpen}
          closeRemove={closeRemove}
          feedRemove={feedRemove}
        />
      )}
    </StepProvider>
  );
};

export default React.memo(Review);
