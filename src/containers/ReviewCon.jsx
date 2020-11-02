import React, {useEffect} from 'react';

import {getReviews} from '../modules/reviews';
import {useSelector, useDispatch} from 'react-redux';

import Review from '../components/review';

const ReviewCon=()=>{
    const dispatch=useDispatch();
    const {reviews}=useSelector(state=>(
        {
            reviews:state.reviews.reviews, 
        }
    ));

    useEffect(()=>{
        if(reviews) return;

        dispatch(getReviews());
    }, [dispatch, reviews]);

    return (reviews&&<Review reviews={reviews}/>)
}

export default ReviewCon;