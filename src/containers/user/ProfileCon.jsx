import React, {useEffect, useCallback, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Profile from "../../components/profile";

import { logout, getInfo, check, userUpdate } from "../../modules/user";
import { checkNick, initAuth } from '../../modules/auth';

const ProfileCon=({history})=>{
    const {user, info, nick, nickError, uError, order, iloading}=useSelector(
        ({user, auth, order, loading})=>({
            user:user.user,
            info:user.info,
            nick: auth.nick,
            nickError: auth.nickError,
            uError:user.error,
            order:order.order,
            iloading:loading['user/GET_INFO']
        })
    );
    const dispatch=useDispatch();
    const [nickname, setNickname]=useState('');
    const [error, setError] = useState({
        nick:false,
        addr:false,
        detail:false
    });
    const [kakao, setKakao]=useState([]);
    const [hasNextPage, setHasNextPage]=useState(true);
    const [loading, setLoading]=useState(false);
    const [query, setQuery]=useState('');
    const [addr, setAddr]=useState('');
    const [open, setOpen] = useState(false);
    const [detail, setDetail]=useState('');
    const addrRef = useRef(null);
    const detailRef=useRef(null);

    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
    }, []);
    const detailChange=useCallback((e)=>{
        setError(prev=>({...prev, detail:false}));

        const {value}=e.target;
        setDetail(value);
    }, []);
    const clearAddress=useCallback(()=>{
        setAddr('');
    }, []);
    const handleClickOpen = useCallback(() => {
        const filter="win16|win32|win64|macintel|mac";
        if(navigator.platform &&filter.indexOf(navigator.platform.toLowerCase()) > 0){
            //모바일
            setOpen(true);
            setError(prev=>({...prev, addr:false}));

            return;
        } else{ //PC
            new window.daum.Postcode({
                oncomplete:(data)=>{
                    setAddr(data.address);
                    detailRef.current.focus();
                },
                onclose:()=>{
                    addrRef.current.blur();
                }
            }).open({
                popupName: 'postcodePopup'
            });
        }
    }, []);
    const handleOnExit=useCallback(()=>{
        addrRef.current.blur();
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);
    const addrOnClick=useCallback((addr)=>{
        setTimeout(()=>{detailRef.current.focus()}, 200);
        setAddr(addr);
        setOpen(false);
    }, []);
    const getAddress=useCallback((query, page)=>{
        setLoading(true);

        axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
            headers: {
                'Authorization' : `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
            },
            params:{
                query,
                page
            }
        })
        .then((response)=>{
            if(page===1){
                setKakao(response.data.documents);
            }
            else{
                setKakao(prev=>[...prev, ...response.data.documents]);
            }
            setHasNextPage(!response.data.meta.is_end);
            setLoading(false);
        })
        .catch((error)=>{
            if(error.response.status===400){
                setHasNextPage(false);
            }
        })
    }, [])
    const queryOnChange=useCallback((e)=>{
        const {value}=e.target;
        setQuery(value);
        getAddress(value, 1);
    }, [getAddress])
    const loadNextPage=useCallback(({startIndex})=>{
        const page=Math.ceil(startIndex/10)+1;
        getAddress(query, page);
    }, [query, getAddress]);
    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);
    const onChange=useCallback((e)=>{
        const {value}=e.target;
        setNickname(value);

        if (value === ''||value===user.nick){
            setError(prev=>({...prev, nick:false}));            
            return;
        } else{
            dispatch(checkNick({ nick: value }));
        }
    }, [dispatch, user]);
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if(error.nick||error.addr||error.detail) return;
        if(nickname===user.nick&&info.address===addr&&info.detail===detail) return;
        if(addr!==''&&detail===''){
            setError(prev=>({...prev, detail:true}));

            return;
        } 
        if(addr===''&&detail!==''){
            setError(prev=>({...prev, addr:true}));

            return;
        }

        setError(prev=>({
            ...prev,
            detail:false,
            addr:false
        }));
        dispatch(userUpdate({nickname, address:addr, detail}));
    }, [nickname, dispatch, error, user, addr, detail, info]);

    useEffect(()=>{
        dispatch(check());
        
        return ()=>dispatch(initAuth());
    }, [dispatch]);  
    useEffect(()=>{
        if(!user){
            history.push('/login');
            alert('로그인 해주세요.');
        } else{
            setNickname(user.nick);

            try{
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e){
                console.error('localStorage is not working');
            }
        }
    }, [user, history]);
    useEffect(()=>{
        if(info) return;
        if(uError) return;
        if(iloading) return;

        dispatch(getInfo());
    }, [info, dispatch, uError, iloading]);
    useEffect(()=>{
        if(info){
            setAddr(info.address?info.address:'');
            setDetail(info.detail?info.detail:'');
        }
    }, [info]);
    useEffect(() => {
        try{
            if (nickError) {
                if(nickError.response&&
                    (nickError.response.status===400||
                        nickError.response.status===409)){
                    setError(prev=>({...prev, nick:true}));
                    dispatch(initAuth());
    
                    return;
                }

                throw nickError;
            }
            if (nick) {
                setError(prev=>({...prev, nick:false}));
                dispatch(initAuth());
            }
        } catch(e){
            console.error(e);
        }
    }, [nickError, nick, dispatch]);

    return  <Profile 
                onLogout={onLogout} 
                info={info} 
                nickname={nickname} 
                error={error} 
                onChange={onChange}
                onSubmit={onSubmit}
                kakao={kakao}
                loadNextPage={loadNextPage}
                loading={loading}
                hasNextPage={hasNextPage}
                queryOnChange={queryOnChange}
                query={query}
                addr={addr}
                addrOnClick={addrOnClick}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                detail={detail}
                detailChange={detailChange}
                clearAddress={clearAddress}
                addrRef={addrRef}
                handleMouseDown={handleMouseDown}
                order={order}
                detailRef={detailRef}
                handleOnExit={handleOnExit}
            />                
};

export default withRouter(ProfileCon);