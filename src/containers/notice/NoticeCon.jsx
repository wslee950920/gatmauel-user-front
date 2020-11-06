import React, {useEffect} from 'react';

import {getNotices} from '../../modules/notices';
import {useSelector, useDispatch} from 'react-redux';

import Notice from '../../components/notice';

const NoticeCon=()=>{
    const dispatch=useDispatch();
    const {notices}=useSelector(state=>(
        {
            notices:state.notices.notices, 
        }
    ));

    useEffect(()=>{
        dispatch(getNotices());
    }, [dispatch]);

    return <Notice notices={notices}/>
}

export default NoticeCon;