import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {usePreloader} from '../../lib/PreloadContext';

import {getReviews} from '../../modules/reviews';
import {getNotices} from '../../modules/notices';
import {getFood} from '../../modules/food';

import Main from '../../components/main';

const MainContainer=()=>{
    const {
        reviews, 
        notices, 
        rloading, 
        nloading, 
        rError, 
        nError,
        food,
        floading,
        fError,
        rlastPage,
        nlastPage,
        order
    }=useSelector(state=>(
        {
            reviews:state.reviews.reviews, 
            notices:state.notices.notices,
            rloading:state.loading['reviews/GET'],
            nloading:state.loading['notices/GET'],
            rError:state.reviews.error,
            nError:state.notices.error,
            food:state.food.food,
            floading:state.loading['get/Food'],
            fError:state.food.error,
            rlastPage:state.reviews.lastPage,
            nlastPage:state.notices.lastPage,
            order:state.order.order
        }
    ));
    const dispatch=useDispatch();
    const [hasNextPage, setHasNextPage]=useState({reviews:true, notices:true});
    
    usePreloader(()=>dispatch(getReviews()));
    usePreloader(()=>dispatch(getNotices()));
    usePreloader(()=>dispatch(getFood()));

    useEffect(()=>{
        if(rError) return;
        if(rloading) return;
        if(reviews.length>0) return;

        if(hasNextPage.reviews){
            dispatch(getReviews());
        }
    }, [dispatch, reviews, rloading, rError, hasNextPage]);
    useEffect(()=>{
        if(Math.ceil(reviews.length/10)===rlastPage){
          setHasNextPage(prev=>({...prev, reviews:false}));
        } 
      }, [reviews, rlastPage]);
    useEffect(()=>{
        if(notices.length>0) return;
        if(nloading) return;
        if(nError) return;

        if(hasNextPage.notices){
            dispatch(getNotices());
        }
    }, [dispatch, notices, nloading, nError, hasNextPage]);
    useEffect(()=>{
        if(Math.ceil(notices.length/10)===nlastPage){
            setHasNextPage(prev=>({...prev, notices:false}));
        }    
    }, [notices, nlastPage]);
    useEffect(()=>{
        if(food) return;
        if(fError) return;
        if(floading) return;

        dispatch(getFood());
    }, [dispatch, food, floading, fError]);

    return <Main reviews={reviews} notices={notices} food={food} order={order}/>
};

export default MainContainer;