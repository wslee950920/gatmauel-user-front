import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {usePreloader} from '../lib/PreloadContext';

import {getReviews} from '../modules/reviews';
import {getNotices} from '../modules/notices';

import Main from '../components/main';

const MainContainer=()=>{
    const {reviews, notices, rloading, nloading, rError, nError}=useSelector(state=>(
        {
            reviews:state.reviews.reviews, 
            notices:state.notices.notices,
            rloading:state.loading['reviews/GET'],
            nloading:state.loading['notices/GET'],
            rError:state.reviews.error,
            nError:state.notices.error
        }
    ));
    const dispatch=useDispatch();
    
    usePreloader(()=>dispatch(getReviews()));
    usePreloader(()=>dispatch(getNotices()));

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

    return <Main reviews={reviews} notices={notices} />
};

export default MainContainer;