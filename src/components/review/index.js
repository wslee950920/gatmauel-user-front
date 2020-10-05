import React, { useRef, useCallback, useMemo } from "react";
import { List, WindowScroller } from "react-virtualized";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";
import "react-virtualized/styles.css"; // only needs to be imported once

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewItem from "./ReviewItem";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
  },
  write: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  const rowHeight = useMemo(() => {
    if (small) {
      return 700;
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

  return (
    <>
      <WindowScroller>
        {({ height, isScrolling, registerChild, scrollTop }) => (
          <div className={classes.paper}>
            <div className={classes.write}>
              <div>리뷰쓰기</div>
            </div>
            <div ref={registerChild}>
              <List
                autoHeight
                height={height - 56 - 8 - clsx(small ? 0 : 37.09) - 8}
                rowCount={datas.current.length}
                rowHeight={rowHeight}
                width={parseInt(width)}
                rowRenderer={rowRenderer}
                list={datas}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
              />
            </div>
          </div>
        )}
      </WindowScroller>
    </>
  );
};

export default Review;
