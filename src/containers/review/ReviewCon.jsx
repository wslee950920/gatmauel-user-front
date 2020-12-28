import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { getReviews, modReview, subReview } from '../../modules/reviews';
import { useSelector, useDispatch } from 'react-redux';
import { 
  writeReview, 
  openDialog, 
  closeDialog, 
  addImage, 
  removeImage,
  initialize,
  changeField,
  removeReview
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
    lastPage,
    loading
  } = useSelector(state => (
    {
      reviews: state.reviews.reviews,
      user: state.user.user,
      review: state.review.review,
      reviewError: state.review.reviewError,
      content:state.review.content,
      open:state.review.open,
      imgs:state.review.imgs,
      lastPage:state.reviews.lastPage,
      loading:state.loading['reviews/GET']
    }
  ));
  let formData=new FormData();
  const [rOpen, setRopen]=useState(false);
  const [reviewId, setReviewId]=useState(null);
  const [hasNextPage, setHasNextPage]=useState(true);

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
    history.push(`/review/update/${index}`);
    dispatch(openDialog());
    dispatch(changeField({
      key:'content',
      value:reviews[index].content
    }));
  }, [history, dispatch, reviews]);
  const feedRemove=useCallback(()=>{
    dispatch(removeReview(reviewId));
    setRopen(false);
  }, [dispatch, reviewId]);
  const openRemove=useCallback((id)=>{
    setRopen(true);
    setReviewId(id);
  }, []);
  const closeRemove=useCallback(()=>{
    setRopen(false);
  }, []);
  const loadNextPage = useCallback(
    ({ startIndex }) => {
      const nextPage = Math.ceil((startIndex+1)/10)+1;
      //console.log('loadNextPage', startIndex, nextPage);

      if (nextPage<=lastPage){
        dispatch(getReviews(nextPage));
      } else{
        setHasNextPage(false);
      }
    },
    [dispatch, lastPage]
  );

  useEffect(() => {
    dispatch(check());
    dispatch(getReviews());

    return ()=>{
      dispatch(initialize());
    }
  }, [dispatch]);
  useEffect(() => {
    try{
      if(reviewError) {
        if(reviewError.response&&reviewError.response.status===403){
          dispatch(check());
          alert('로그인을 해주세요.');
          dispatch(closeDialog());
          dispatch(initialize());

          return;
        } else if(reviewError.response&&reviewError.response.status===400){
            alert('내용을 입력해주세요.');

            return;
        }

        throw reviewError;
      }

      if (review) {
        if(review.hasOwnProperty('updated')){
          dispatch(modReview(review));
        }

        if(review.hasOwnProperty('deleted')){
          dispatch(subReview(review));
        } else{
          dispatch(initialize());
          dispatch(closeDialog());
        }
        dispatch(getReviews());
      } 
    } catch(e){
      console.error(e);
    }
  }, [review, reviewError, dispatch]);

  return (
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
      feedRemove={feedRemove}
      rOpen={rOpen}
      openRemove={openRemove}
      closeRemove={closeRemove}
      loading={loading}
      loadNextPage={loadNextPage}
      hasNextPage={hasNextPage}
    />
  )
}

export default withRouter(ReviewCon);