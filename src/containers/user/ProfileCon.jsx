import React, {useEffect, useCallback, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Profile from "../../components/profile";

import { logout, getInfo, check, userUpdate, setInfoPhone } from "../../modules/user";
import { checkNick, initAuth } from '../../modules/auth';

import {user as userAPI} from '../../lib/api/client';
import {getPlatform} from '../../lib/usePlatform';
import useTimer from '../../lib/useTimer';

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
        code:''
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
    const [platform, setPlatform]=useState(null);

    const onChange=useCallback((event)=>{
        const {name, value}=event.target;
        if(name==='detail'){
            setError(prev=>({
                ...prev,
                addr:false,
                detail:false
            }))
            setDetail(value);
        } else if(name==='code'){
            setError(prev=>({...prev, code:''}));

            const curValue = value;
            const newValue = curValue.replace(/[^0-9]/g, "");
            setCode(newValue);
        }
    }, [])
    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
    }, []);
    const phoneChange=useCallback((e)=>{
        const {value}=e.target;
        setPhone(value);
        
        if(info && value === info.phone){
            setConfirm(true)
        } else{
            setConfirm(false);
        }
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
        setError(prev=>({...prev, addr:false, detail:false}));

        if(platform){
            setOpen(true);

            return;
        } else{
            new window.daum.Postcode({
                oncomplete:(data)=>{
                    setAddr(data.address);

                    userAPI.get('/order/distance', {
                        params:{goal:data.address}
                      }).then((res)=>{
                        if(res.data.distance>5000){
                            setError(prev=>({...prev, addr:true}))
                            alert('거리 5km이상 지역은 배달이 불가합니다.');
                        } else{
                            detailRef.current.focus();
                        }
                      }).catch((err)=>{
                        if(err.response){
                            if(err.response.status===404){
                                alert('주소를 찾을 수 없습니다.');
                            }
                        }
                        else{
                            alert(err.message);
                        }
                    });
                },
                onclose:()=>{
                    addrRef.current.blur();
                }
            }).open({
                popupName: 'postcodePopup'
            });
        }
    }, [platform]);
    const handleOnExit=useCallback(()=>{
        addrRef.current.blur();
        window.scroll(0, 0);
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);
    const addrOnClick=useCallback((addr)=>{
        setAddr(addr);
        setOpen(false);

        userAPI.get('/order/distance', {
              params:{goal:addr}
          }).then((res)=>{
            if(res.data.distance>5000){
                setError(prev=>({...prev, addr:true}));
                alert('거리 5km이상 지역은 배달이 불가합니다.');
            } else{
                setTimeout(()=>{detailRef.current.focus()}, 200);
            }
          }).catch((err)=>{
            if(err.response){
              if(err.response.status===404){
                alert('주소를 찾을 수 없습니다.');
              }
            }else{
                alert(err.message);
            }
          });
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
            if(error.response){
                if(error.response.status===400){
                    setHasNextPage(false);
                }
            } else{
                alert(error.message);
            }
            setLoading(false);
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
    const nickChange=useCallback((e)=>{
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
            setError(prev=>({
                ...prev,
                detail:true
            }))
            return;
        }
        if(addr===''&&detail!==''){
            setError(prev=>({
                ...prev,
                addr:true
            }))
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
        setError(prev=>({...prev, code:''}));
        setCode('');

        if(confirm){
            return;
        }

        userAPI.post('/user/phone', {phone})
            .then((res)=>{
                setVerify(true);

                const temp=new Date(res.data.updatedAt);
                temp.setMinutes(temp.getMinutes()+3);
                setEnd(temp);
            })
            .catch((e)=>{
                if(e.response){  
                    alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                } else{
                    alert(e.message);
                }
            })
    }, [phone, confirm]);
    const confirmPhone=useCallback(()=>{
        if(code===''){
            return;
        }

        userAPI.post('/user/callback', {code, phone})
            .then(()=>{
                dispatch(setInfoPhone(phone));

                setError(prev=>({...prev, code:'', phone:false}));
                setConfirm(true);
                setVerify(false);
                setSse(null);
                setEnd(null);

                es.current.close();
            })
            .catch((error)=>{
                setConfirm(false);

                if(error.response){
                    if(error.response.status===419){
                        setError(prev=>({...prev, code:'인증번호가 만료되었습니다.'}));
                    } else if(error.response.status===404){
                        setError(prev=>({...prev, code:'인증번호가 틀렸습니다.'}));
                    } else if(error.response.status===403){
                        setError(prev=>({...prev, code:'전화번호가 다릅니다.'}));
                    } else{
                        alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                    }
                } else{
                    alert(error.message);
                }
            });
    }, [code, phone, dispatch]);

    useEffect(()=>{
        setPlatform(getPlatform());

        return ()=>{
            if(es&&es.current){
                es.current.close();
            }
        }    
    }, [])
    useEffect(()=>{
        if(verify){
            es.current=new EventSource((process.env.NODE_ENV==='production'
                ?'https://user.gatmauel.com/@user/user/timer'
                :'https://localhost/@user/user/timer'));

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
                alert(e.message);
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
        if (nickError) {
            if(nickError.response&&
                (nickError.response.status===400||
                    nickError.response.status===409)){
                setError(prev=>({...prev, nick:true}));
            } else{
                alert(nickError.message);
            }
        }
        else if (nick) {
            setError(prev=>({...prev, nick:false}));
        }
    }, [nickError, nick]);

    return  <Profile 
                onLogout={onLogout} 
                info={info} 
                nickname={nickname} 
                error={error} 
                nickChange={nickChange}
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
                onChange={onChange}
                clearAddress={clearAddress}
                addrRef={addrRef}
                handleMouseDown={handleMouseDown}
                detailRef={detailRef}
                handleOnExit={handleOnExit}
                phone={phone}
                phoneChange={phoneChange}
                checkPhone={checkPhone}
                timer={useTimer(sse, end)}
                verify={verify}
                confirmPhone={confirmPhone}
                code={code}
            />                
};

export default withRouter(ProfileCon);