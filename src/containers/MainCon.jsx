import React, {useEffect} from 'react';
import {getReviews} from '../modules/reviews';
import {getNotices} from '../modules/notices';
import {useSelector, useDispatch} from 'react-redux';

import Main from '../components/main';

const MainContainer=()=>{
    const {reviews, notices}=useSelector(state=>(
        {
            reviews:state.reviews.reviews, 
            notices:state.notices.notices,
        }
    ));
    const dispatch=useDispatch();
    useEffect(()=>{
        //이렇게 해도 const getReviews = () => async (dispatch) => {}의 두번째
        //인자로 dispatch가 전달 되는 듯
        dispatch(getReviews());
    }, [dispatch]);
    useEffect(()=>{
        dispatch(getNotices());
    }, [dispatch]);

    //ssr과 csr을 위한 jsx를 분리하였기 때문에 csr에서는 
    //Preloader를 사용할 필요가 없다.
    return <Main reviews={reviews} notices={notices}/>
};

export default MainContainer;