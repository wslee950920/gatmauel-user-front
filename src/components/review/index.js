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
import url from "url";

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

const Review = ({
  reviews,
  history,
  user,
  content,
  imgs,
  handleFileOnChange,
  handleFileRemove,
  onChange,
  onSubmit,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const bSmall = useMediaQuery(theme.breakpoints.between(400, "sm"));
  const { width } = useWindowDimensions();
  const paper = useRef(null);
  const [pWidth, setpWidth] = useState(width);
  const [open, setOpen] = useState(false);

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
      const data = reviews[index];

      return <ReviewItem data={data} style={style} key={key} index={index} />;
    },
    [reviews]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleClickOpen = useCallback(
    (e) => {
      if (!user) {
        e.preventDefault();

        history.push("/login");
        alert("로그인을 해주세요.");
      }

      setOpen(true);
    },
    [user, history]
  );

  useEffect(() => {
    setpWidth(paper.current.getBoundingClientRect().width);
  }, []);
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
      <WindowScroller>
        {({ height, isScrolling, registerChild, scrollTop }) => (
          <div className={classes.paper} ref={paper}>
            <RWView
              handleClickOpen={handleClickOpen}
              rOnly
              imgs={imgs}
              handleFileOnChange={handleFileOnChange}
              handleFileRemove={handleFileRemove}
              content={content}
              onSubmit={onSubmit}
            />
            <div ref={registerChild}>
              <List
                autoHeight
                height={height - 56 - 8 - clsx(small ? 0 : 37.09) - 8}
                rowCount={reviews.length}
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
      <FullScreenDialog
        open={open}
        handleClose={handleClose}
        imgs={imgs}
        handleFileOnChange={handleFileOnChange}
        handleFileRemove={handleFileRemove}
        content={content}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </StepProvider>
  );
};

export default React.memo(Review);
