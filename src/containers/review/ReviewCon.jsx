import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormData from 'form-data';
import querystring from 'querystring';

import {usePreloader} from '../../lib/PreloadContext';
import {user as userAPI} from '../../lib/api/client'

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

      if (imgs.length < 5) {
        const files = e.target.files;
        try {
          for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
              dispatch(addImage({
                file: files[i],
                uri: reader.result,
              }))        
            };
            reader.readAsDataURL(files[i]);
          }
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert("이미지는 5개까지만 추가할 수 있습니다.");
        return;
      }
    },
    [imgs, dispatch]
  );
  const handleFileRemove = useCallback((index) => {
    dispatch(removeImage(index));
  }, [dispatch]);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if(!user){
        history.push('/login');
        alert('로그인을 해주세요');

        return;
      }
      
      if (content === '' && imgs.length === 0) return;

      const formData=new FormData();
      const promises=imgs.map((img)=>
        new Promise((resolve, reject)=>{
          try{
            formData.append("imgs", img.file);
            resolve();    
          } catch(e){
            reject(e);
          }
        })
      );
      promises.push(
        new Promise((resolve, reject)=>{
          try{
            formData.append("content", content);
            resolve();
          } catch(e){
            reject(e);
          }
        })
      );
      Promise.all(promises)
        .then(()=>{
          dispatch(writeReview({formData, setProgress}));
        })
        .catch((err)=>{
          alert(err.message);
        });
    },
    [content, imgs, dispatch, history, user]
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
    setTimeout(()=>{
      dispatch(changeField({
        key:'content',
        value:reviews[index].content
      }));
    }, 300);
  }, [history, dispatch, reviews]);
  const feedRemove=useCallback(()=>{
    if(hashtags.length>0&&search!==''){
      setHashtags(prev=>prev.filter(current=>current.id!==reviewId));
    }

    dispatch(removeReview(reviewId));
    setRopen(false);
  }, [dispatch, reviewId, hashtags, search]);
  const openRemove=useCallback((id)=>{
    setRopen(true);
    setReviewId(id);
  }, []);
  const closeRemove=useCallback(()=>{
    setRopen(false);
  }, []);
  
  const hashtagUpdate=useCallback((id, content)=>{
    if(hashtags.length<1||search==='') return;

    setHashtags(prev=>prev.map((current)=>
      current.id===id
      ?{
        ...current,
        content
      }
      :current
    ));
  }, [hashtags, search]);
  const getHashtags=useCallback((query, page)=>{
    setHloading(true);
    setHasNextPage(true);

    userAPI.post('/review/hashtag', {
      hashtag:query,
      page
    }).then((res)=>{
        if(page===1){
          setHashtags(res.data.reviews);
        } else{
          setHashtags(prev=>[
            ...new Set([...prev, ...res.data.reviews]
              .map(JSON.stringify))]
              .map(JSON.parse)
          );
        }
        setHasNextPage(!res.data.is_end);
      }).catch((err)=>{
        if(err.response&&err.response.status===204){
          setHasNextPage(false);
        } else{
          alert(err.message); 
        }
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
    if(reviewError) {
      if(reviewError.response){
        if(reviewError.response.status===403){
          dispatch(check());
          alert('로그인을 해주세요.');
          dispatch(closeDialog());
          dispatch(initialize());
        } else if(reviewError.response.status===400){
          alert('내용을 입력해주세요.');
        }
      } else{
        alert(reviewError.message);
      }
      return;
    } else if (review) {
      if(review.hasOwnProperty('updated')){
        dispatch(modReview(review));
      } else if(review.hasOwnProperty('deleted')){
        dispatch(subReview(review));
      } else{
        dispatch(initialize());
        dispatch(closeDialog());
      }
      dispatch(getReviews());
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
        hashtagUpdate={hashtagUpdate}
      />
    </>
  )
}

export default withRouter(ReviewCon);