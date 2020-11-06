import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { getReviews } from '../modules/reviews';
import { useSelector, useDispatch } from 'react-redux';
import { writeReview } from '../modules/write';

import Review from '../components/review';

const ReviewCon = ({ history }) => {
  const dispatch = useDispatch();
  const { reviews, user, review, reviewError } = useSelector(state => (
    {
      reviews: state.reviews.reviews,
      user: state.user.user,
      review: state.write.review,
      reviewError: state.write.reviewError
    }
  ));
  const [imgs, setImgs] = useState([]);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  let formData = new FormData();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleClickOpen = useCallback(
    () => {
      if (!user) {
        history.push("/login");
        alert("로그인을 해주세요.");

        return;
      }

      setOpen(true);
    },
    [user, history]
  );
  const handleFileOnChange = useCallback(
    (e) => {
      e.preventDefault();

      if (imgs.length < 10) {
        const files = e.target.files;
        try {
          for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
              setImgs((prev) => {
                if (prev.length < 10) {
                  return [
                    ...prev,
                    {
                      file: files[i],
                      previewURL: reader.result,
                    },
                  ];
                } else {
                  alert("이미지는 10개까지만 추가할 수 있습니다.");
                  return prev;
                }
              });
            };
            reader.readAsDataURL(files[i]);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        alert("이미지는 10개까지만 추가할 수 있습니다.");
        return;
      }
    },
    [imgs]
  );
  const handleFileRemove = useCallback((index) => {
    setImgs(prev => prev.filter((v, i) => index !== i));
  }, []);
  const onChange = useCallback((e) => {
    const { value } = e.target;
    setContent(value);
  }, []);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (content === '' && imgs.length === 0) return;

      await formData.append("content", content);
      await imgs.forEach((img) => {
        formData.append("imgs", img.file);
      });
      await dispatch(writeReview(formData));
    },
    [content, formData, imgs, dispatch]
  );

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);
  useEffect(() => {
    if (review) {
      history.go(0);
    }
    if (reviewError) {
      if(reviewError.response.status===403){
        alert('로그인을 해주세요');
        history.go(0);
      }
    }
  }, [review, reviewError, dispatch, history]);

  return (reviews &&
    <Review
      reviews={reviews}
      content={content}
      imgs={imgs}
      handleFileOnChange={handleFileOnChange}
      handleFileRemove={handleFileRemove}
      onChange={onChange}
      onSubmit={onSubmit}
      open={open}
      handleClose={handleClose}
      handleClickOpen={handleClickOpen}
    />)
}

export default withRouter(ReviewCon);