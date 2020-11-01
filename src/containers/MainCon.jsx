import React, {useEffect} from 'react';
import {getReviews} from '../modules/reviews';
import {getNotices} from '../modules/notices';
import {useSelector, useDispatch} from 'react-redux';

import Main from '../components/main';
import Header from "../components/header";
import Footer from "../components/footer";

const MainContainer=()=>{
    const {reviews, notices, user}=useSelector(state=>(
        {
            reviews:state.reviews.reviews, 
            notices:state.notices.notices,
            user:state.user.user
        }
    ));
    const dispatch=useDispatch();
    useEffect(()=>{
        //여기에서는 서버에서 reviews를 주입해서 오기 때문에 
        //중복 호출을 피하기 위해 필요하다.
        if(reviews) return;
        //이렇게 해도 const getReviews = () => async (dispatch) => {}의 두번째
        //인자로 dispatch가 전달 되는 듯
        dispatch(getReviews());
    }, [dispatch, reviews]);
    useEffect(()=>{
        if(notices) return;
        dispatch(getNotices());
    }, [dispatch, notices]);

    //ssr과 csr을 위한 jsx를 분리하였기 때문에 csr에서는 
    //Preloader를 사용할 필요가 없다.
    return(
        <>
            <Header main user={user}/>
            <Main reviews={reviews} notices={notices}/>
            <Footer/>
        </>
    )  
};

export default MainContainer;