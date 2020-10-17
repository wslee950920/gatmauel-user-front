import React, { useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import NoticeLitemLink from "./NoticeLitemLink";
import Footer from "../footer";

import usePlatform from "../../lib/usePlatform";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const Notice = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { height, width } = useWindowDimensions();
  const datas = useRef(
    new Array(20).fill({
      text: `Wish I could come, but I'm out of town this…주방 공사합니다.`,
      to: "#",
    })
  );
  const platform = usePlatform();

  //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  //새로운 변수 이름으로 할당하기(data->datas)
  const Row = useCallback(({ index, style, data: datas }) => {
    const data = datas[index];

    return (
      <NoticeLitemLink
        data={data}
        style={style}
        index={index}
        length={datas.length}
      />
    );
  }, []);

  return (
    <>
      <List
        className={classes.root}
        height={
          height -
          56 -
          8 -
          clsx(matches ? 0 : 37.09) -
          8 -
          clsx(platform ? 0 : 57.43)
        }
        itemCount={datas.current.length}
        itemSize={100}
        width={width}
        itemData={datas.current}
      >
        {Row}
      </List>
      {platform ? null : <Footer />}
    </>
  );
};

export default Notice;
