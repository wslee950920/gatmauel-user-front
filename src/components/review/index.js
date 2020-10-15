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

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewItem from "./ReviewItem";
import Write from "./Write";
import FullScreenDialog from "./FullScreenDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const Review = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const bSmall = useMediaQuery(theme.breakpoints.between(400, "sm"));
  const { width } = useWindowDimensions();
  const datas = useRef(
    new Array(10).fill({
      text: `Wish I could come, but I'm out of town this…주방 공사합니다.`,
    })
  );
  const [open, setOpen] = useState(false);
  const paper = useRef(null);
  const [pWidth, setpWidth] = useState(width);

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

      return <ReviewItem data={data} style={style} key={key} />;
    },
    [datas]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    setpWidth(paper.current.getBoundingClientRect().width);
  });

  return (
    <>
      <WindowScroller>
        {({ height, isScrolling, registerChild, scrollTop }) => (
          <div className={classes.paper} ref={paper}>
            <Write handleClickOpen={handleClickOpen} />
            <div ref={registerChild}>
              <List
                autoHeight
                height={height - 56 - 8 - clsx(small ? 0 : 37.09) - 8}
                rowCount={datas.current.length}
                rowHeight={rowHeight}
                width={parseFloat(pWidth)}
                rowRenderer={rowRenderer}
                list={datas}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
              />
            </div>
          </div>
        )}
      </WindowScroller>
      <FullScreenDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Review;
