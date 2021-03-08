import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getNotices, setSearch, initResults, getResults} from '../../modules/notices';

import {usePreloader} from '../../lib/PreloadContext';

import Notice from '../../components/notice';
import SearchBar from "../../components/common/SearchBar";

const NoticeCon=({history})=>{
    const dispatch=useDispatch();
    const {notices, loading, lastPage, order, search, result}=useSelector(state=>(
        {
            notices:state.notices.notices, 
            loading:state.loading['notices/GET'],
            lastPage:state.notices.lastPage,
            order:state.order.order,
            search:state.notices.search,
            result:state.notices.result
        }
    ));
    const [hasNextPage, setHasNextPage]=useState(true);

    const searchOnChange=useCallback((event)=>{
        dispatch(initResults());

        const {value}=event.target;
        dispatch(setSearch(value));
        if(value){
          dispatch(getResults(value, 1));
        }

        window.scroll(0, 0);
      }, [dispatch]);

    const loadNextPage=useCallback(({startIndex})=>{
        if(search){
            dispatch(getResults(search, Math.ceil(startIndex/10)+1));
        } else{
            dispatch(getNotices(Math.ceil(startIndex/10)+1));
        }
    }, [dispatch, search]);

    usePreloader(()=>dispatch(getNotices()));

    useEffect(()=>{
        if(!search){
            if(Math.ceil(notices.length/10)===lastPage){
                setHasNextPage(false);
            } else{
                setHasNextPage(true);
            }
        } else{
          setHasNextPage(!result.is_end);
        }    
    }, [notices, lastPage, search, result]);
    useEffect(()=>{
        return history.listen((location, action) => {
          if (location.pathname.indexOf("/notice")<0) {
            dispatch(initResults());
            dispatch(setSearch(''));
          }
        });
      }, [history, dispatch]);

    return (
        <>
            <SearchBar value={search} onChange={searchOnChange}/>
            <Notice 
                notices={search?result.docs:notices} 
                hasNextPage={hasNextPage} 
                loadNextPage={loadNextPage}
                loading={loading||false}
                order={order}
            />
        </>
    );
}

export default React.memo(NoticeCon);