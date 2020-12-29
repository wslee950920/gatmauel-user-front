import React, {useEffect} from 'react';
import {getReviews} from '../modules/reviews';
import {getNotices} from '../modules/notices';
import {useSelector, useDispatch} from 'react-redux';
import {usePreloader} from '../lib/PreloadContext';

import Main from '../components/main';

const MainContainer=()=>{
    const {reviews, notices}=useSelector(state=>(
        {
            reviews:state.reviews.reviews, 
            notices:state.notices.notices,
        }
    ));
    const dispatch=useDispatch();
    
    usePreloader(()=>dispatch(getReviews()));
    usePreloader(()=>dispatch(getNotices()));

    useEffect(()=>{
        if(!reviews){
            dispatch(getReviews());
        }
        
        if(!notices){
            dispatch(getNotices());
        }
    }, [dispatch]);

    if(!reviews&&!notices){
        return null;
    }
    return <Main reviews={reviews} notices={notices}/>
};

export default MainContainer;