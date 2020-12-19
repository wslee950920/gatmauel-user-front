import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { getReviews } from '../../modules/reviews';
import { useSelector, useDispatch } from 'react-redux';
import { 
  writeReview, 
  openDialog, 
  closeDialog, 
  addImage, 
  removeImage,
  initialize,
  changeField
} from '../../modules/review';
import {check} from '../../modules/user';

import Review from '../../components/review';

const ReviewCon = ({ history }) => {
  const dispatch = useDispatch();
  const { 
    reviews, 
    user, 
    review, 
    reviewError, 
    content, 
    open,
    imgs,
  } = useSelector(state => (
    {
      reviews: state.reviews.reviews,
      user: state.user.user,
      review: state.review.review,
      reviewError: state.review.reviewError,
      content:state.review.content,
      open:state.review.open,
      imgs:state.review.imgs,
    }
  ));
  let formData=new FormData();

  const handleClose = useCallback(() => {
    history.push('/review');
    dispatch(closeDialog());
  }, [history, dispatch]);
  const handleClickOpen = useCallback(
    () => {
      if (!user) {
        history.push("/login");
        alert("로그인을 해주세요.");

        return;
      }

      history.push('/review/write');
      dispatch(openDialog());
    },
    [user, history, dispatch]
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
              dispatch(addImage({
                file: files[i],
                previewURL: reader.result,
              }))        
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
    [imgs, dispatch]
  );
  const handleFileRemove = useCallback((index) => {
    dispatch(removeImage(index));
  }, [dispatch]);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if(!user){
        history.push('/login');
        alert('로그인을 해주세요');

        return;
      }
      
      if (content === '' && imgs.length === 0) return;

      await formData.append("content", content);
      await imgs.forEach((img) => {
        formData.append("imgs", img.file);
      });
      await dispatch(writeReview(formData));
    },
    [content, formData, imgs, dispatch, history, user]
  );
  const onCamera=useCallback(()=>{
    if(!user){
      history.push('/login');
      alert('로그인을 해주세요.');
    } else{
      history.push('/review/camera');
      dispatch(openDialog());
    }
  }, [history, user, dispatch]);
  const feedUpdate=useCallback((index)=>{
    dispatch(changeField({
      key:'content',
      value:reviews[index].content
    }));
    history.push(`/review/update/${index}`);
    dispatch(openDialog());
  }, [history, dispatch, reviews]);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(check());

    return ()=>{
      dispatch(initialize());
    }
  }, [dispatch]);
  useEffect(() => {
    if (review) {
      dispatch(getReviews());
      dispatch(closeDialog());
      dispatch(initialize());
    } 
    else if(reviewError) {
      if(reviewError.response.status===403){
        dispatch(check());
        alert('로그인을 해주세요.');
        dispatch(closeDialog());
        dispatch(initialize());
      } else if(reviewError.response.status===400){
          alert('내용을 입력해주세요.');
      }
    }
  }, [review, reviewError, dispatch]);

  return (reviews &&
    <Review
      reviews={reviews}
      content={content}
      imgs={imgs}
      handleFileOnChange={handleFileOnChange}
      handleFileRemove={handleFileRemove}
      onSubmit={onSubmit}
      open={open}
      handleClose={handleClose}
      handleClickOpen={handleClickOpen}
      onCamera={onCamera}
      user={user}
      feedUpdate={feedUpdate}
    />)
}

export default withRouter(ReviewCon);