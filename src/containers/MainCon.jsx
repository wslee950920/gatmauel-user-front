import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {usePreloader} from '../lib/PreloadContext';

import {getReviews} from '../modules/reviews';
import {getNotices} from '../modules/notices';

import Main from '../components/main';

const MainContainer=()=>{
    const {reviews, notices, rloading, nloading}=useSelector(state=>(
        {
            reviews:state.reviews.reviews, 
            notices:state.notices.notices,
            rloading:state.loading['reviews/GET'],
            nloading:state.loading['notices/GET']
        }
    ));
    const dispatch=useDispatch();
    
    usePreloader(()=>dispatch(getReviews()));
    usePreloader(()=>dispatch(getNotices()));

    useEffect(()=>{
        if(!reviews&&!rloading){
            dispatch(getReviews());
        }
        
        if(!notices&&!nloading){
            dispatch(getNotices());
        }
    }, [dispatch, reviews, notices, rloading, nloading]);

    return <Main reviews={reviews} notices={notices} />
};

export default MainContainer;