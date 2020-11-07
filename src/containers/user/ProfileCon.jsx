import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Profile from "../../components/profile";

import { logout, getInfo, check } from "../../modules/user";
import { checkNick, init } from '../../modules/auth';

const ProfileCon=({history})=>{
    const {user, info, nick, nickError}=useSelector(
        ({user, auth})=>({
            user:user.user,
            info:user.info,
            nick: auth.nick,
            nickError: auth.nickError,
        })
    );
    const dispatch=useDispatch();
    const [nickname, setNickname]=useState('');
    const [error, setError] = useState({
        nick:false
    });

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
      }, []);

    useEffect(()=>{
        dispatch(check());
        
        return ()=>dispatch(init());
    }, [dispatch]);  
    useEffect(()=>{
        if(!user){
            history.push('/login');
            alert('로그인 해주세요.');
        } else{
            setNickname(user.nick);
        }
    }, [user, history]);
    useEffect(()=>{
        if(!info){
            dispatch(getInfo());
        }
    }, [info, dispatch]);
    useEffect(() => {
        if (nickError) {
            setError(prev=>({...prev, nick:true}));

            return;
        }
        if (nick) {
            setError(prev=>({...prev, nick:false}));
        }
    }, [nickError, nick]);

    return  <Profile 
                onLogout={onLogout} 
                info={info} 
                nickname={nickname} 
                error={error} 
                onChange={onChange}
                onSubmit={onSubmit}
            />                
};

export default withRouter(ProfileCon);