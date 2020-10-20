import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { List, WindowScroller } from "react-virtualized";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";
import "react-virtualized/styles.css"; // only needs to be imported once
import { StepProvider } from "./context/step";
import querystring from "querystring";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewItem from "./ReviewItem";
import FullScreenDialog from "./FullScreenDialog";
import RWView from "../common/RWView";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const RenderReviewItem = React.forwardRef((props, ref) => (
  <ReviewItem forwardedRef={ref} {...props} />
));

const Review = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const bSmall = useMediaQuery(theme.breakpoints.between(400, "sm"));
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const paper = useRef(null);
  const [pWidth, setpWidth] = useState(width);
  const datas = useRef(
    new Array(10).fill({
      text: `Wish I could come, but I'm out of town this…주방 공사합니다.`,
    })
  );
  const itemRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));

  useEffect(() => {
    const str =
      window.location.search[0] === "?"
        ? window.location.search.substr(1, window.location.search.length)
        : window.location.search;
    const query = querystring.parse(str);
    const empty =
      Object.keys(query).length === 0 && query.constructor === Object;
    if (!empty) {
      window.scrollTo({
        top: small
          ? itemRefs.current[parseInt(query.id)].current.getBoundingClientRect()
              .height *
              parseInt(query.id) +
            itemRefs.current[0].current.getBoundingClientRect().top -
            paper.current.getBoundingClientRect().top +
            theme.spacing(4)
          : itemRefs.current[parseInt(query.id)].current.getBoundingClientRect()
              .top -
            56 -
            theme.spacing(3),
      });
    }
  }, [small, theme]);

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
      const data = datas.current[index];

      return (
        <RenderReviewItem
          data={data}
          style={style}
          key={key}
          index={index}
          ref={index < 4 ? itemRefs.current[index] : null}
        />
      );
    },
    [datas]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setpWidth(paper.current.getBoundingClientRect().width);
  }, [pWidth]);

  return (
    <StepProvider datas={datas.current}>
      <WindowScroller>
        {({ height, isScrolling, registerChild, scrollTop }) => (
          <div className={classes.paper} ref={paper}>
            <RWView handleClickOpen={handleClickOpen} rOnly />
            <div ref={registerChild}>
              <List
                autoHeight
                height={height - 56 - 8 - clsx(small ? 0 : 37.09) - 8}
                rowCount={datas.current.length}
                rowHeight={rowHeight}
                width={parseFloat(pWidth)}
                rowRenderer={rowRenderer}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
                overscanRowCount={4}
              />
            </div>
          </div>
        )}
      </WindowScroller>
      <FullScreenDialog open={open} handleClose={handleClose} />
    </StepProvider>
  );
};

export default Review;
