import React, { useRef, useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import SearchBar from "../common/SearchBar";
import NoticeLitemLink from "./NoticeLitemLink";
import Footer from "../footer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
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
  const filter = useRef("win16|win32|win64|macintel|mac|"); // PC일 경우 가능한 값

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
  const platform = useMemo(() => {
    return (
      navigator.platform &&
      filter.current.indexOf(navigator.platform.toLowerCase()) < 0
    );
  }, []);

  return (
    <>
      {!matches && <SearchBar />}
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
