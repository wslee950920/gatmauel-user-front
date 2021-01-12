import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getNotices} from '../../modules/notices';

import {usePreloader} from '../../lib/PreloadContext';

import Notice from '../../components/notice';

const NoticeCon=()=>{
    const dispatch=useDispatch();
    const {notices, loading, lastPage}=useSelector(state=>(
        {
            notices:state.notices.notices, 
            loading:state.loading['notices/GET'],
            lastPage:state.notices.lastPage,
        }
    ));
    const [hasNextPage, setHasNextPage]=useState(true);

    const loadNextPage=useCallback((startIndex)=>{
        dispatch(getNotices(Math.ceil(startIndex/10)+1));
    }, [dispatch]);

    usePreloader(()=>dispatch(getNotices()));

    useEffect(()=>{
        if(Math.ceil(notices.length/10)===lastPage){
            setHasNextPage(false);
        }    
    }, [notices, lastPage]);

    return (
        <Notice 
            notices={notices} 
            hasNextPage={hasNextPage} 
            loadNextPage={loadNextPage}
            loading={loading||false}
        />
    );
}

export default NoticeCon;