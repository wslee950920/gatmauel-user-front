import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getReviews} from '../module/reviews';
import {Preloader} from '../lib/PreloadContext';

import Main from '../components/main';

const MainContainer=({reviews, getReviews})=>{
    useEffect(()=>{
        //여기에서는 서버에서 reviews를 주입해서 오기 때문에 
        //중복 호출을 피하기 위해 필요하다.
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