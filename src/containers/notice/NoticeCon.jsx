import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getNotices} from '../../modules/notices';

import {usePreloader} from '../../lib/PreloadContext';

import Notice from '../../components/notice';

const NoticeCon=()=>{
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

    return <Notice notices={notices}/>
}

export default NoticeCon;