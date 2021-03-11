import React, { useEffect, useCallback, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormData from "form-data";
import axios from "axios";

import { usePreloader } from "../../lib/PreloadContext";
import { user as userAPI } from "../../lib/api/client";

import { getReviews, modReview, subReview } from "../../modules/reviews";
import {
  writeReview,
  openDialog,
  closeDialog,
  removeImage,
  initialize,
  changeField,
  removeReview,
} from "../../modules/review";
import { check } from "../../modules/user";

import Review from "../../components/review";
import SearchBar from "../../components/common/SearchBar";

const ReviewCon = ({ history, location }) => {
  const dispatch = useDispatch();
  const {
    reviews,
    user,
    review,
    reviewError,
    content,
    open,
    imgs,
    lastPage,
    gloading,
    wloading,
    order,
  } = useSelector((state) => ({
    reviews: state.reviews.reviews,
    user: state.user.user,
    review: state.review.review,
    reviewError: state.review.reviewError,
    content: state.review.content,
    open: state.review.open,
    imgs: state.review.imgs,
    lastPage: state.reviews.lastPage,
    gloading: state.loading["reviews/GET"],
    wloading: state.loading["write/WRITE_REVIEW"],
    order: state.order.order,
  }));
  const [rOpen, setRopen] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [search, setSearch] = useState("");
  const [hloading, setHloading] = useState(false);
  const source = useRef(null);

  const handleClose = useCallback(() => {
    history.push("/review");
  }, [history]);
  const handleClickOpen = useCallback(
    (e) => {
      if (location.pathname === "/review") {
        e.preventDefault();
      }

      if (!user) {
        history.push("/login");
        alert("로그인을 해주세요.");

        return;
      }

      history.push("/review/write");
      dispatch(openDialog());
    },
    [user, history, dispatch, location]
  );
  const handleFileRemove = useCallback(
    (index) => {
      dispatch(removeImage(index));
    },
    [dispatch]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!user) {
        history.push("/login");
        alert("로그인을 해주세요");

        return;
      }

      if (content === "" && imgs.length === 0) return;

      const formData = new FormData();
      const promises = imgs.map(
        (img) =>
          new Promise((resolve, reject) => {
            try {
              formData.append("imgs", img.file);
              resolve();
            } catch (e) {
              reject(e);
            }
          })
      );
      promises.push(
        new Promise((resolve, reject) => {
          try {
            formData.append("content", content);
            resolve();
          } catch (e) {
            reject(e);
          }
        })
      );
      Promise.all(promises)
        .then(() => {
          dispatch(writeReview({ formData, setProgress }));
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [content, imgs, dispatch, history, user]
  );
  const onCamera = useCallback(() => {
    if (!user) {
      history.push("/login");
      alert("로그인을 해주세요.");
    } else {
      history.push("/review/camera");
      dispatch(openDialog());
    }
  }, [history, user, dispatch]);
  const feedUpdate = useCallback(
    (index) => {
      history.push(`/review/update/${index}`);
      dispatch(openDialog());
      setTimeout(() => {
        dispatch(
          changeField({
            key: "content",
            value: (search === "" ? reviews : hashtags)[index].content,
          })
        );
      }, 300);
    },
    [history, dispatch, reviews, hashtags, search]
  );
  const feedRemove = useCallback(() => {
    dispatch(removeReview(reviewId));
    setRopen(false);
  }, [dispatch, reviewId]);
  const openRemove = useCallback((id) => {
    setRopen(true);
    setReviewId(id);
  }, []);
  const closeRemove = useCallback(() => {
    setRopen(false);
  }, []);

  const getHashtags = useCallback(
    (query, page) => {
      setHloading(true);
      setHasNextPage(true);

      if (source.current) {
        source.current.cancel("consecutive requests");
      }
      const CancelToken = axios.CancelToken;
      source.current = CancelToken.source();

      userAPI
        .get("/review/hashtag", {
          params: {
            hashtag: query,
            page,
          },
          cancelToken: source.current.token,
        })
        .then((res) => {
          setHashtags((prev) =>
            [...prev, ...res.data.reviews]
              .reduce((acc, cur) => {
                if (acc.findIndex(({ id }) => id === cur.id) === -1) {
                  acc.push(cur);
                }
                return acc;
              }, [])
              .sort((l, r) => r.id - l.id)
          );
          setHasNextPage(!res.data.is_end);
          setHloading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            return;
          } else {
            alert(err.message);
            setHloading(false);
            setHasNextPage(false);
          }
        });
    },
    [source]
  );
  const searchOnChange = useCallback(
    (event) => {
      setHashtags([]);

      const { value } = event.target;
      setSearch(value);
      if (value) {
        getHashtags(value, 1);
      }

      window.scroll(0, 0);
    },
    [getHashtags]
  );
  const loadNextPage = useCallback(
    ({ startIndex }) => {
      if (search) {
        getHashtags(search, Math.ceil(startIndex / 10) + 1);
      } else {
        dispatch(getReviews(Math.ceil(startIndex / 10) + 1));
      }
    },
    [dispatch, search, getHashtags]
  );
  const hashtagOnClick = useCallback(
    (value) => {
      setSearch(value.replace("#", ""));
      getHashtags(value.replace("#", ""), 1);

      window.scroll(0, 0);
    },
    [getHashtags]
  );

  usePreloader(() => dispatch(getReviews()));

  useEffect(() => {
    if (!search) {
      if (Math.ceil(reviews.length / 10) === lastPage) {
        setHasNextPage(false);
      } else {
        setHasNextPage(true);
      }
    }
  }, [reviews, lastPage, search]);
  useEffect(() => {
    dispatch(check());

    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  useEffect(() => {
    if (reviewError) {
      if (reviewError.response) {
        if (reviewError.response.status === 403) {
          dispatch(check());
          dispatch(initialize());
          dispatch(closeDialog());
          alert("로그인을 해주세요.");
        } else if (reviewError.response.status === 400) {
          alert("내용을 입력해주세요.");
        }
      } else {
        alert(reviewError.message);
      }
      return;
    } else if (review) {
      if (review.hasOwnProperty("updated")) {
        dispatch(modReview(review));
      } else if (review.hasOwnProperty("deleted")) {
        dispatch(subReview(review));
      }

      dispatch(initialize());
      dispatch(getReviews());
      history.push("/review");
    }
  }, [review, reviewError, dispatch, history]);
  useEffect(() => {
    if (review) {
      if (hashtags.length < 1 || search === "") return;

      if (review.hasOwnProperty("updated")) {
        setHashtags((prev) =>
          prev.map((obj) =>
            obj.id === parseInt(review.updated)
              ? {
                  ...obj,
                  content,
                }
              : obj
          )
        );
      } else if (review.hasOwnProperty("deleted")) {
        setHashtags((prev) =>
          prev.filter((obj) => obj.id !== parseInt(review.deleted))
        );
      }
    }
  }, [review, hashtags, search, content]);
  useEffect(() => {
    return history.listen((location, action) => {
      if (location.pathname === "/review") {
        dispatch(closeDialog());
        dispatch(initialize());
      }
    });
  }, [history, dispatch]);

  return (
    <>
      <SearchBar hashtag value={search} onChange={searchOnChange} />
      <Review
        reviews={search ? hashtags : reviews}
        content={content}
        imgs={imgs}
        handleFileRemove={handleFileRemove}
        onSubmit={onSubmit}
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        onCamera={onCamera}
        user={user}
        feedUpdate={feedUpdate}
        feedRemove={feedRemove}
        rOpen={rOpen}
        openRemove={openRemove}
        closeRemove={closeRemove}
        gloading={(search ? hloading : gloading) || false}
        loadNextPage={loadNextPage}
        hasNextPage={hasNextPage}
        progress={progress}
        wloading={wloading}
        order={order}
        hashtagOnClick={hashtagOnClick}
      />
    </>
  );
};

export default withRouter(ReviewCon);
