import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Account from "../../components/account";
import Header from "../../components/header";
import Copyright from "../../components/footer/Copyright";

import { getInfo } from "../../modules/user";

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
            if(!info){
                dispatch(getInfo());
            }  
        }
    }, [user, history, dispatch, info])

    return(
        <>
            <Header main user={user}/>
            <Account info={info}/>
            <Copyright/>
        </> 
    )
};

export default withRouter(AccountCon);