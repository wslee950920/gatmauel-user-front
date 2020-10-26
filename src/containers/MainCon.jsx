import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getReviews} from '../module/reviews';
import {Preloader} from '../lib/PreloadContext';

import Main from '../components/main';

const MainContainer=({reviews, getReviews})=>{
    useEffect(()=>{
        if(reviews) return;
        getReviews();
    }, [getReviews, reviews]);

    return (
        <>
            <Main reviews={reviews}/>
            <Preloader resolve={getReviews}/>
        </>
    );
};

export default connect(
    state=>({
        reviews:state.reviews.reviews
    }),
    {
        getReviews
    }
)(MainContainer);