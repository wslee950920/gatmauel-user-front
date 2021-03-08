import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getNotices} from '../../modules/notices';

import {usePreloader} from '../../lib/PreloadContext';

import ReadNotice from '../../components/notice/ReadNotice';

const ReadNoticeCon=({match})=>{
    const dispatch=useDispatch();
    const {notices, loading, error, search, result}=useSelector(state=>(
        {
            notices:state.notices.notices,
            loading:state.loading['notices/GET'],
            error:state.notices.error,
            search:state.notices.search,
            result:state.notices.result 
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

    const {index}=match.params;
    if(search
        ?(result.docs.length<1||!result.docs[index])
        :notices.length<1||!notices[index]
    ) return null;
    return <ReadNotice notice={search?result.docs[index]:notices[index]}/>;
}

export default React.memo(ReadNoticeCon);