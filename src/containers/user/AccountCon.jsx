import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Account from "../../components/account";

import { check, pwUpdate, userWithdraw } from "../../modules/user";

const AccountCon=({history})=>{
    const {user, error}=useSelector(({user})=>({
        user:user.user,
        error:user.error
    }));
    const [oldPassword, setOldPass]=useState('');
    const [newPassword, setNewPass]=useState('');
    const [confirm, setConfirm]=useState('');
    const [email, setEmail]=useState('');
    const [pError, setPError]=useState({res:false, comp:false});
    const [wError, setWError]=useState(false);
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();

    const handleClickOpen = useCallback(() => {
        setOpen(true);
      }, []);
      const handleClose = useCallback(() => {
        setOpen(false);
        setWError(false);
      }, []);
    const onChange=useCallback((e)=>{
        const {name, value}=e.target;

        if(name==='oldPass')
            setOldPass(value);
        else if(name==='newPass')
            setNewPass(value);
        else if(name==='confirm')
            setConfirm(value);
        else if(name==='email')
            setEmail(value);
    }, []);
    const wdSubmit=useCallback((e)=>{
        e.preventDefault();

        if(email===''){
            setWError(true);

            return;
        } 

        dispatch(userWithdraw({email}));
    }, [email, dispatch]);
    const pwSubmit=useCallback((e)=>{
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
        if(error){
            if(error.response){
                if(error.response.status===401){
                    setPError(prev=>({...prev, res:true}));
                }
                else if(error.response.status===409){
                    alert('SNS 로그인은 비밀번호를 변경할 수 없습니다.')
                }
                else if(error.response.status===403){
                    setWError(true);
                }
            } else{
                alert(error.message);
            }
        }
    }, [error]);
    useEffect(()=>{
        dispatch(check());
    }, [dispatch]);
    useEffect(()=>{
        if(!user){
            history.push('/login');
        }
    }, [user, history]);

    return (
        <Account     
            pError={pError} 
            onChange={onChange} 
            pwSubmit={pwSubmit}
            wdSubmit={wdSubmit}
            wError={wError}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
        />
    );
};

export default withRouter(AccountCon);