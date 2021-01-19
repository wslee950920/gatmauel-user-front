import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {getNotices} from '../../modules/notices';

import {usePreloader} from '../../lib/PreloadContext';

import Notice from '../../components/notice';
import SearchBar from "../../components/common/SearchBar";

const NoticeCon=()=>{
    const dispatch=useDispatch();
    const {notices, loading, lastPage, order}=useSelector(state=>(
        {
            notices:state.notices.notices, 
            loading:state.loading['notices/GET'],
            lastPage:state.notices.lastPage,
            order:state.order.order
        }
    ));
    const [hasNextPage, setHasNextPage]=useState(true);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const loadNextPage=useCallback(({startIndex})=>{
        dispatch(getNotices(Math.ceil(startIndex/10)+1));
    }, [dispatch]);

    usePreloader(()=>dispatch(getNotices()));

    useEffect(()=>{
        if(Math.ceil(notices.length/10)===lastPage){
            setHasNextPage(false);
        }    
    }, [notices, lastPage]);

    return (
        <>
            {!matches&&<SearchBar/>}
            <Notice 
                notices={notices} 
                hasNextPage={hasNextPage} 
                loadNextPage={loadNextPage}
                loading={loading||false}
                order={order}
            />
        </>
    );
}

export default NoticeCon;