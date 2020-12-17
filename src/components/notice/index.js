import React, { useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";
import usePlatform from "../../lib/usePlatform";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import NoticeLitemLink from "./NoticeLitemLink";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const Notice = ({ notices }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { height, width } = useWindowDimensions();
  const platform = usePlatform();

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
      itemCount={notices ? notices.length : 0}
      itemSize={100}
      width={width}
      itemData={notices}
    >
      {Row}
    </List>
  );
};

export default React.memo(Notice);
