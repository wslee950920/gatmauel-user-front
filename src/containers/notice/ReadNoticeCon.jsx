import React, {useEffect} from 'react';

import {getNotices} from '../../modules/notices';
import {useSelector, useDispatch} from 'react-redux';

import ReadNotice from '../../components/notice/ReadNotice';

const ReadNoticeCon=({match})=>{
    const dispatch=useDispatch();
    const {notices}=useSelector(state=>(
        {
            notices:state.notices.notices, 
        }
    ));
    const {id}=match.params;

    useEffect(()=>{
        if(notices) return;

        dispatch(getNotices());
    }, [dispatch, notices]);

    return (notices&&<ReadNotice notice={notices[id]}/>);
}

export default ReadNoticeCon;