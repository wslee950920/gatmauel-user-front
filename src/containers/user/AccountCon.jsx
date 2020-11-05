import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Account from "../../components/account";

import { getInfo, check } from "../../modules/user";

const AccountCon=({history})=>{
    const {user, info}=useSelector(({user})=>({
        user:user.user,
        info:user.info,
    }));
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!user){
            history.push('/login');
            alert('로그인 해주세요.');
        } else{
            dispatch(check());
        }
    }, [user, history, dispatch]);
    useEffect(()=>{
        if(!info){
            dispatch(getInfo());
        }
    }, [info, dispatch]);

    return <Account info={info}/>
};

export default withRouter(AccountCon);