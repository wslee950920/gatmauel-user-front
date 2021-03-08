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
        if(notices.length>0) return;
        if(loading) return;
        if(error) return;

        dispatch(getNotices());
    }, [dispatch, notices, loading, error]);
    useEffect(()=>{
        window.scroll(0, 0);
    }, []);

    const {id}=match.params;
    if(notices.length<1||!notices[id]) return null;
    return <ReadNotice notice={notices[id]}/>;
}

export default React.memo(ReadNoticeCon);