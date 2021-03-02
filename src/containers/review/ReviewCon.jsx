import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormData from 'form-data';
import querystring from 'querystring';
import axios from 'axios';

import {usePreloader} from '../../lib/PreloadContext';

import { getReviews, modReview, subReview } from '../../modules/reviews';
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
    order
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
      gloading:state.loading['reviews/GET'],
      wloading:state.loading['write/WRITE_REVIEW'],
      order:state.order.order
    }
  ));
  const formData=new FormData();
  const [rOpen, setRopen]=useState(false);
  const [reviewId, setReviewId]=useState(null);
  const [hasNextPage, setHasNextPage]=useState(true);
  const [progress, setProgress]=useState(0);
  const [hashtags, setHashtags]=useState([]);
  const [search, setSearch]=useState('');
  const [hloading, setHloading]=useState(false);

  const scrollToIndex=useMemo(()=>{
    const url=location.search.split('?')[1];
    const query=querystring.parse(url);

    return parseInt(query.index||-1);
  }, [location.search]);

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
          console.log('image add error');
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
      await dispatch(writeReview({formData, setProgress}));
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
  
  const getHashtags=useCallback((query, page)=>{
    setHloading(true);
    setHasNextPage(true);

    axios.post(process.env.NODE_ENV==='production'
      ?`https://user.gatmauel.com/@user/review/hashtag`
      :'https://localhost/@user/review/hashtag', {
      hashtag:query,
      page
    }).then((res)=>{
        if(page===1){
          setHashtags(res.data.reviews);
        } else{
          setHashtags(prev=>[...prev, ...res.data.reviews]);
        }
        setHasNextPage(!res.data.is_end);
      }).catch((err)=>{
        if(err.response&&err.response.status===204){
          setHasNextPage(false);

          return;
        }

        alert('오류가 발생하였습니다. 잠시 후 다시 시도해주십시오.');
      })
      .finally(()=>{
        setHloading(false);
        window.scrollTo(0, 0);
      })
  }, []);
  const searchOnChange=useCallback((event)=>{
    const {value}=event.target;
    setSearch(value);
    if(value===''){
      setHashtags([]);
    } else{
      getHashtags(value, 1);
    }
  }, [getHashtags]);
  const loadNextPage=useCallback(({startIndex})=>{
    if(search){
      getHashtags(search, Math.ceil(startIndex/10)+1)
    } else{
      dispatch(getReviews(Math.ceil(startIndex/10)+1));
    }
  }, [dispatch, search, getHashtags]);
  const hashtagOnClick=useCallback((value)=>{
    setSearch(value.replace('#', ''));
    getHashtags(value.replace('#', ''), 1);
  }, [getHashtags])

  usePreloader(()=>dispatch(getReviews()));

  useEffect(()=>{
    if(!search){
      if(Math.ceil(reviews.length/10)===lastPage){
        setHasNextPage(false);
      } else{
        setHasNextPage(true);
      }
    } 
  }, [reviews, lastPage, search]);
  useEffect(() => {
    dispatch(check());

    return ()=>{
      dispatch(initialize());
    }
  }, [dispatch]);
  useEffect(() => {
    try{
      if(reviewError) {
        if(reviewError.response){
          if(reviewError.response.status===403){
            dispatch(check());
            alert('로그인을 해주세요.');
            dispatch(closeDialog());
            dispatch(initialize());
  
            return;
          } else if(reviewError.response.status===400){
            alert('내용을 입력해주세요.');
  
            return;
          }
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
      console.log('review CUD error');
    }
  }, [review, reviewError, dispatch]);

  return (
    <>
      <SearchBar hashtag value={search} onChange={searchOnChange} />
      <Review
        reviews={search?hashtags:reviews}
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
        gloading={(search?hloading:gloading)||false}
        loadNextPage={loadNextPage}
        hasNextPage={hasNextPage}
        progress={progress}
        wloading={wloading}
        scrollToIndex={scrollToIndex}
        order={order}
        hashtagOnClick={hashtagOnClick}
      />
    </>
  )
}

export default withRouter(ReviewCon);