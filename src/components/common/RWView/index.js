import React from "react";
import clsx from "clsx";
import useWindowDimensions from "../../../lib/windowDimensions";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";

import Head from "./Head";
import Tools from "./Tools";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  background: {
    backgroundColor: "white",
    border: "thin solid #dcdcdc",
    borderRadius: "2px",
    width: "100%",
  },
  textArea: {
    width: "100%",
    border: "none",
    fontSize: "1rem",
    fontFamily: "NanumSquare",
    backgroundColor: "white",
    padding: theme.spacing(2),
  },
  back: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  gList: {
    display: "flex",
    justifyContent: "flex-start",
    overflow: "hidden",
    overflowX: "scroll",
    backgroundColor: theme.palette.background.paper,
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: "white",
  },
  titleBar: {
    background: "rgba(0,0,0,0)",
  },
  img: {
    width: 100,
    height: 100,
  },
  tile: {
    margin: theme.spacing(0, 0.5),
  },
  add: {
    display: "flex",
    alignItems: "center",
  },
  fontRobo: {
    fontFamily: "Roboto",
  },
  end: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(0, 1),
  },
}));

const RWView = ({
  handleClickOpen,
  rOnly,
  data,
  imgs,
  handleFileOnChange,
  handleFileRemove,
  content,
  onChange,
  onSubmit,
  onCamera,
  inputId,
}) => {
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        {...(data && {
          style: {
            height: height - 56 - 8 - 57.43 - parseInt(clsx(matches ? 8 : "0")),
          },
        })}
      >
        <div className={classes.background}>
          {data && <Head title={data.title} time={data.createdAt} />}
          <TextareaAutosize
            aria-label="read-write-data"
            rowsMin={clsx(data ? 16 : 2)}
            rowsMax={clsx(data ? 16 : rOnly ? 2 : 10)}
            className={classes.textArea}
            onClick={handleClickOpen}
            readOnly={rOnly}
            value={data ? data.content : content}
            {...(data
              ? {
                  style: {
                    fontFamily: "Roboto",
                  },
                }
              : {
                  onChange,
                  name: "content",
                })}
            autoFocus={!data && !rOnly}
          />
          {!data && imgs.length > 0 && (
            <>
              <div className={classes.end}>
                <Typography variant="caption" className={classes.fontRobo}>
                  * 정방형 사진을 올려주세요.
                </Typography>
              </div>
              <List className={classes.gList}>
                {imgs.map((img, index) => (
                  <GridListTile key={index} className={classes.tile}>
                    <img
                      src={img.previewURL}
                      alt="리뷰 이미지"
                      className={classes.img}
                    />
                    <GridListTileBar
                      classes={{
                        root: classes.titleBar,
                      }}
                      actionIcon={
                        <IconButton
                          aria-label={`close-${index}`}
                          onClick={() => handleFileRemove(index)}
                          size="small"
                        >
                          <CloseIcon
                            className={classes.title}
                            fontSize="small"
                          />
                        </IconButton>
                      }
                      titlePosition="top"
                    />
                  </GridListTile>
                ))}
                {imgs.length < 10 && (
                  <label htmlFor={inputId} className={classes.add}>
                    <IconButton
                      aria-label={"add-image"}
                      component="span"
                      onClick={handleClickOpen}
                    >
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  </label>
                )}
              </List>
            </>
          )}
          {!data && (
            <Tools
              handleClickOpen={handleClickOpen}
              handleFileOnChange={handleFileOnChange}
              onSubmit={onSubmit}
              onCamera={onCamera}
              inputId={inputId}
            />
          )}
        </div>
        {rOnly && data && (
          <div className={classes.back}>
            <Link
              to="/notice"
              style={{
                fontFamily: "Roboto",
                color: theme.palette.text.secondary,
              }}
            >
              돌아가기
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default React.memo(RWView);
