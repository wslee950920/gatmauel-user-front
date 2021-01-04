import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Account from "../../components/account";

import { getInfo, check, pwUpdate } from "../../modules/user";

const AccountCon=({history})=>{
    const {user, info, error}=useSelector(({user})=>({
        user:user.user,
        info:user.info,
        error:user.error
    }));
    const [oldPassword, setOldPass]=useState('');
    const [newPassword, setNewPass]=useState('');
    const [confirm, setConfirm]=useState('');
    const [pError, setPError]=useState({res:false, comp:false});
    const dispatch=useDispatch();

    const onChange=useCallback((e)=>{
        const {name, value}=e.target;

        if(name==='oldPass')
            setOldPass(value);
        else if(name==='newPass')
            setNewPass(value);
        else if(name==='confirm')
            setConfirm(value);
    }, []);
    const onSubmit=useCallback((e)=>{
        e.preventDefault();

        if((newPassword!==confirm)){
            setPError(prev=>({...prev, comp:true}));

            if(oldPassword===''){
                setPError(prev=>({...prev, res:true}));
    
                return;
            } else{
                setPError(prev=>({...prev, res:false}))
            }

            return;
        } else{
            if((newPassword==='')||(confirm==='')){
                setPError(prev=>({...prev, comp:true}));
                
                if(oldPassword===''){
                    setPError(prev=>({...prev, res:true}));
        
                    return;
                } else{
                    setPError(prev=>({...prev, res:false}))
                }

                return;
            }

            setPError(prev=>({...prev, comp:false}));
        }
        
        if(oldPassword===''){
            setPError(prev=>({...prev, res:true}));

            return;
        } else{
            setPError(prev=>({...prev, res:false}))
        }

        if(oldPassword===newPassword){
            alert('이전 비밀번호와 새 비밀번호가 같습니다.');

            return;
        }

        dispatch(pwUpdate({newPassword, oldPassword}));
        setPError(prev=>({...prev, res:false, comp:false}));
    }, [confirm, newPassword, dispatch, oldPassword]);

    useEffect(()=>{
        if(error&&error.response.status===401){
            setPError(prev=>({...prev, res:true}));
        }
        else if(error&&error.response.status===409){
            alert('SNS 로그인은 비밀번호 변경을 할 수 없습니다.')
        }
    }, [error]);
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

    return <Account info={info} error={pError} onChange={onChange} onSubmit={onSubmit}/>
};

export default withRouter(AccountCon);