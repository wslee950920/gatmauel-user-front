import React, {useEffect} from 'react';
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
        fError
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
            fError:state.food.error
        }
    ));
    const dispatch=useDispatch();
    
    usePreloader(()=>dispatch(getReviews()));
    usePreloader(()=>dispatch(getNotices()));
    usePreloader(()=>dispatch(getFood()));

    useEffect(()=>{
        if(reviews||rloading) return;
        if(rError) return;

        dispatch(getReviews());
    }, [dispatch, reviews, rloading, rError]);
    useEffect(()=>{
        if(notices||nloading) return;
        if(nError) return;

        dispatch(getNotices());
    }, [dispatch, notices, nloading, nError]);
    useEffect(()=>{
        if(food||floading) return;
        if(fError) return;

        dispatch(getFood());
    }, [dispatch, food, floading, fError]);

    return <Main reviews={reviews} notices={notices} />
};

export default MainContainer;