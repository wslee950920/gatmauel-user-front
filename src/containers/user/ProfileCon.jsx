import React, {useEffect, useCallback, useState, useRef, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Profile from "../../components/profile";

import { logout, getInfo, check, userUpdate, setInfoPhone } from "../../modules/user";
import { checkNick, initAuth } from '../../modules/auth';

import {user as userAPI} from '../../lib/api/client';

const ProfileCon=({history})=>{
    const {user, info, nick, nickError, uError, iloading}=useSelector(
        ({user, auth, loading})=>({
            user:user.user,
            info:user.info,
            nick: auth.nick,
            nickError: auth.nickError,
            uError:user.error,
            iloading:loading['user/GET_INFO']
        })
    );
    const dispatch=useDispatch();
    const [nickname, setNickname]=useState('');
    const [error, setError] = useState({
        nick:false,
        addr:false,
        detail:false,
        code:false
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
    const [phone, setPhone]=useState('');
    const [verify, setVerify]=useState(false);
    const es=useRef(null);
    const [end, setEnd]=useState(null);
    const [sse, setSse]=useState(null);
    const [code, setCode]=useState('');
    const [confirm, setConfirm]=useState(true);
    const [helper, setHelper]=useState('');

    const timer = useMemo(() => {
        if(sse&&end){
            if (sse >= end) {    
              return "00:00";
            } else {
              const temp = end - sse;
              const seconds = ("0" + Math.floor((temp / 1000) % 60)).slice(-2);
              const minutes = ("0" + Math.floor((temp / 1000 / 60) % 60)).slice(-2);
        
              return minutes + ":" + seconds;
            }
        } else{
            return '';
        }
      }, [sse, end]);

    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
    }, []);
    const detailChange=useCallback((e)=>{
        setError(prev=>({
            ...prev,
            addr:false,
            detail:false
        }))

        const {value}=e.target;
        setDetail(value);
    }, []);
    const phoneChange=useCallback((e)=>{
        const {value}=e.target;
        if(value===info.phone){
            setConfirm(true)
        } else{
            setConfirm(false);
        }
        setPhone(value);
    }, [info])
    const clearAddress=useCallback(()=>{
        setError(prev=>({
            ...prev,
            addr:false,
            detail:false
        }))
        setAddr('');
    }, []);
    const handleClickOpen = useCallback(() => {
        const filter="win16|win32|win64|macintel|mac";
        if(navigator.platform&&filter.indexOf(navigator.platform.toLowerCase()) < 0){
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
    }, [getAddress]);
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

        if(nickname===user.nick&&addr===info.address&&detail===info.detail&&confirm){
            return;
        }

        if(addr!==''&&detail===''){
            setError(prev=>({...prev, detail:true}));

            return;
        } 
        if(addr===''&&detail!==''){
            setError(prev=>({...prev, addr:true}));

            return;
        }

        dispatch(userUpdate({
            nickname, 
            address:addr, 
            detail, 
            phone:confirm?info.phone:null
        }));

        setVerify(false);
        setSse(null);
        setEnd(null);
        if(es&&es.current){
            es.current.close();
        }
        setError(prev=>({
            ...prev,
            detail:false,
            addr:false,
        }));
        setConfirm(true);
    }, [nickname, dispatch, error, user, addr, detail, info, confirm]);
    const checkPhone=useCallback(()=>{
        setError(prev=>({...prev, code:false}));
        setCode('');

        if(confirm){
            return;
        }

        userAPI.post('/api/user/phone', {phone})
            .then((res)=>{
                setVerify(true);

                const temp=new Date(res.data.updatedAt);
                temp.setMinutes(temp.getMinutes()+3);
                setEnd(temp);
            })
            .catch((e)=>{
                if(e){
                    if(e.response){
                        if(e.response.status===409){
                            alert('이미 사용 중인 전화번호입니다.');
                        } else{
                            alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                        }

                        return;
                    }

                    alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                }
            })
    }, [phone, confirm]);
    const codeOnChange=useCallback((e)=>{
        setError(prev=>({...prev, code:false}));

        const curValue = e.target.value;
        const newValue = curValue.replace(/[^0-9]/g, "");
        setCode(newValue);
    }, [])
    const confirmPhone=useCallback(()=>{
        if(code===''){
            return;
        }

        userAPI.post('/api/user/callback', {code, phone})
            .then(()=>{
                dispatch(setInfoPhone(phone));

                setError(prev=>({...prev, code:false}));
                setConfirm(true);
                setVerify(false);
                setSse(null);
                setEnd(null);

                es.current.close();
            })
            .catch((error)=>{
                setError(prev=>({...prev, code:true}));
                setConfirm(false);

                if(error){
                    if(error.response){
                        if(error.response.status===419){
                            setHelper('인증번호가 만료되었습니다.');
                        } else if(error.response.status===404){
                            setHelper('인증번호가 틀렸습니다.')
                        } else if(error.response.status===403){
                            setHelper('전화번호가 다릅니다.')
                        } else{
                            alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                        }

                        return;
                    }
                    
                    alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                }
            });
    }, [code, phone, dispatch]);

    useEffect(()=>{
        return ()=>{
            if(es&&es.current){
                es.current.close();
            }
        }    
    }, [])
    useEffect(()=>{
        if(verify){
            es.current=new EventSource('http://localhost:9090/api/user/timer',{
                withCredentials: true
            });

            es.current.onmessage=(e)=>{
                setSse(new Date(parseInt(e.data, 10)));
            }    
        }
    }, [verify]);
    useEffect(()=>{
        dispatch(check());
        
        return ()=>dispatch(initAuth());
    }, [dispatch]);  
    useEffect(()=>{
        if(!user){
            history.push('/login');
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

        if(user){
            dispatch(getInfo());
        }
    }, [dispatch, uError, iloading, info, user]);
    useEffect(()=>{
        if(info){
            setAddr(info.address?info.address:'');
            setDetail(info.detail?info.detail:'');
            setPhone(info.phone?info.phone:'');
        }
    }, [info]);
    useEffect(() => {
        try{
            if (nickError) {
                if(nickError.response&&
                    (nickError.response.status===400||
                        nickError.response.status===409)){
                    setError(prev=>({...prev, nick:true}));
    
                    return;
                }

                throw nickError;
            }
            if (nick) {
                setError(prev=>({...prev, nick:false}));
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
                detailRef={detailRef}
                handleOnExit={handleOnExit}
                phone={phone}
                phoneChange={phoneChange}
                checkPhone={checkPhone}
                timer={timer}
                verify={verify}
                confirmPhone={confirmPhone}
                codeOnChange={codeOnChange}
                code={code}
                helper={helper}
            />                
};

export default withRouter(ProfileCon);