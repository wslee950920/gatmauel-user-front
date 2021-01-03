import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Account from "../../components/account";

import { getInfo, check } from "../../modules/user";

const AccountCon=({history})=>{
    const {user, info, error}=useSelector(({user})=>({
        user:user.user,
        info:user.info,
        error:user.error
    }));
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(check());
    }, [dispatch]);
    useEffect(()=>{
        if(!user){
            history.push('/login');
            alert('로그인 해주세요.');
        }
    }, [user, history]);
    useEffect(()=>{
        if(info) return;
        if(error) return;
            
        dispatch(getInfo());
    }, [info, dispatch, error]);

    return <Account info={info}/>
};

export default withRouter(AccountCon);