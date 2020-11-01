import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Profile from "../../components/profile";
import Header from "../../components/header";
import Copyright from "../../components/footer/Copyright";

import { logout, getInfo } from "../../modules/user";
import { checkNick } from '../../modules/auth';

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
        nick: false,
    })

    const onLogout = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    const onChange=useCallback((e)=>{
        const {value}=e.target;
        setNickname(value);

        if (value !== ''&&value!==user.nick)
            dispatch(checkNick({ nick: value }));
    }, [dispatch, user]);

    useEffect(()=>{
        if(!user){
            history.push('/login');
            alert('로그인 해주세요.');
        } else{
            if(!info){
                dispatch(getInfo());
            }
            setNickname(user.nick);
        }
    }, [user, history, dispatch, info]);
    useEffect(() => {
        if (nickError) {
            setError(prev => ({ ...prev, nick: true }));

            return;
        }
        if (nick) {
            setError(prev => ({ ...prev, nick: false }));
        }
    }, [nickError, nick])

    return(
        <>
            <Header main user={user}/>
            <Profile 
                onLogout={onLogout} 
                info={info} 
                nickname={nickname} 
                error={error} 
                onChange={onChange}
            />                
            <Copyright/>
        </>
    )
};

export default withRouter(ProfileCon);