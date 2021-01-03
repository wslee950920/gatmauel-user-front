import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getNotices} from '../../modules/notices';

import {usePreloader} from '../../lib/PreloadContext';

import ReadNotice from '../../components/notice/ReadNotice';

const ReadNoticeCon=({match})=>{
    const dispatch=useDispatch();
    const {notices, loading, error}=useSelector(state=>(
        {
            notices:state.notices.notices,
            loading:state.loading['notices/GET'],
            error:state.notices.error 
        }
    ));

    usePreloader(()=>dispatch(getNotices()));

    useEffect(()=>{
        if(notices||loading) return;
        if(error) return;

        dispatch(getNotices());
    }, [dispatch, notices, loading, error]);

    const {id}=match.params;
    if(!notices||!notices[id]) return null;
    return <ReadNotice notice={notices[id]}/>;
}

export default ReadNoticeCon;