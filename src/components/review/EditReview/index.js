import React, { useRef } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";

import Tools from "./Tools";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 1),
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

const EditReview = ({
  handleClickOpen,
  rOnly,
  imgs,
  handleFileOnChange,
  handleFileRemove,
  content,
  onSubmit,
  onCamera,
  loading,
  progress,
  onChange,
  review,
}) => {
  const classes = useStyles();
  const inputId = useRef("review-image-input");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.background}>
          <TextareaAutosize
            aria-label="read-write-data"
            rowsMin={2}
            rowsMax={rOnly ? 2 : 10}
            className={classes.textArea}
            onClick={handleClickOpen}
            readOnly={rOnly}
            value={content}
            {...(!rOnly && {
              onChange,
              name: "content",
            })}
            autoFocus={!rOnly}
            onFocus={(event) => {
              event.target.selectionStart = content.length;
              event.target.selectionEnd = content.length;
            }}
            disabled={loading}
          />
          {((review && review.imgs) || (imgs && imgs.length > 0)) && (
            <>
              <div className={classes.end}>
                <Typography variant="caption" className={classes.fontRobo}>
                  * 정방형 사진을 올려주세요.
                </Typography>
              </div>
              <List className={classes.gList}>
                {(review ? review.imgs.split("||") : imgs).map((img, index) => (
                  <GridListTile key={index} className={classes.tile}>
                    <img
                      src={
                        review
                          ? process.env.REACT_APP_CF_DOMAIN_NAME + img
                          : img.uri
                      }
                      alt="리뷰 이미지"
                      className={classes.img}
                    />
                    {!review && (
                      <GridListTileBar
                        classes={{
                          root: classes.titleBar,
                        }}
                        actionIcon={
                          <IconButton
                            aria-label={`close-${index}`}
                            onClick={() => handleFileRemove(index)}
                            size="small"
                            disabled={loading}
                          >
                            <CloseIcon
                              className={classes.title}
                              fontSize="small"
                            />
                          </IconButton>
                        }
                        titlePosition="top"
                      />
                    )}
                  </GridListTile>
                ))}
                {!review && imgs.length < 5 && (
                  <label htmlFor={inputId} className={classes.add}>
                    <IconButton
                      aria-label={"add-image"}
                      component="span"
                      onClick={handleClickOpen}
                      disabled={loading}
                    >
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  </label>
                )}
              </List>
            </>
          )}
          <Tools
            handleClickOpen={handleClickOpen}
            handleFileOnChange={handleFileOnChange}
            onSubmit={onSubmit}
            onCamera={onCamera}
            inputId={inputId}
            loading={loading}
            progress={progress}
            review={review}
            rOnly={rOnly}
          />
        </div>
      </Container>
    </div>
  );
};

export default React.memo(EditReview);
