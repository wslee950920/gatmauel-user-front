import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {getNotices, setSearch, initResult, setResult} from '../../modules/notices';

import {usePreloader} from '../../lib/PreloadContext';
import {admin as adminAPI} from '../../lib/api/client'

import Notice from '../../components/notice';
import SearchBar from "../../components/common/SearchBar";

const NoticeCon=()=>{
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
    const [sloading, setSloading]=useState(false);
    const source=useRef(null);

    const getResult=useCallback((query, page)=>{
        setSloading(true);
        setHasNextPage(true);
    
        if(source.current){
          source.current.cancel("consecutive requests");
        }
        const CancelToken = axios.CancelToken;
        source.current = CancelToken.source();
    
        adminAPI.get('/notice/search', {
          params:{
            query,
            page
          },
          cancelToken:source.current.token
        }).then((res)=>{
            dispatch(setResult(res.data));
            setHasNextPage(!res.data.is_end);
            setSloading(false);
          }).catch((err)=>{
            if (axios.isCancel(err)) {
              return;
            } else{
              alert(err.message); 
              setHasNextPage(false);
              setSloading(false);
            }
          });
      }, [source, dispatch]);
    const searchOnChange=useCallback((event)=>{
        dispatch(initResult());

        const {value}=event.target;
        dispatch(setSearch(value));
        if(value){
          getResult(value, 1);
        }

        window.scroll(0, 0);
      }, [getResult, dispatch]);

    const loadNextPage=useCallback(({startIndex})=>{
        if(search){
            getResult(search, Math.ceil(startIndex/10)+1);
        } else{
            dispatch(getNotices(Math.ceil(startIndex/10)+1));
        }
    }, [dispatch, search, getResult]);

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

    return (
        <>
            <SearchBar value={search} onChange={searchOnChange}/>
            <Notice 
                notices={search?result.docs:notices} 
                hasNextPage={hasNextPage} 
                loadNextPage={loadNextPage}
                loading={(search?sloading:loading)||false}
                order={order}
            />
        </>
    );
}

export default NoticeCon;