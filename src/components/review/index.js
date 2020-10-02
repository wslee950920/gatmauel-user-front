import React, { useRef, useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewItem from "./ReviewItem";
import SearchBar from "../common/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&>li:last-child": {
      display: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(1),
  },
}));

const Review = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const bSmall = useMediaQuery(theme.breakpoints.between(400, "sm"));
  const { height, width } = useWindowDimensions();
  const data = useRef(
    new Array(1000).fill({
      text: `Wish I could come, but I'm out of town this…주방 공사합니다.`,
    })
  );

  const itemSize = useMemo(() => {
    if (small) {
      return 850;
    } else if (bSmall) {
      return 665;
    } else if (xSmall) {
      return 620;
    } else return 560;
  }, [small, bSmall, xSmall]);

  const Row = useCallback(({ index, style, data }) => {
    const d = data[index];

    return <ReviewItem data={d} style={style} />;
  }, []);

  return (
    <>
      {!small && <SearchBar />}
      <div className={classes.paper}>
        <List
          className={classes.root}
          height={height - 56 - 8 - clsx(small ? 0 : 37.09) - 8}
          itemCount={data.current.length}
          itemSize={itemSize}
          width={clsx(small ? theme.breakpoints.values.sm : width)}
          itemData={data.current}
        >
          {Row}
        </List>
      </div>
    </>
  );
};

export default Review;
