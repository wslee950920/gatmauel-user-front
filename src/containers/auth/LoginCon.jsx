import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import LogIn from '../../components/login';

import {login} from '../../modules/auth';
import {check} from '../../modules/user';

const LoginCon=({history})=>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [checked, setChecked]=useState(false);
    const [empty, setEmpty]=useState({
        email:false,
        password:false
    });
    const dispatch=useDispatch();
    const {auth, authError, user}=useSelector(({auth, user})=>({
        auth:auth.auth,
        authError:auth.authError,
        user:user.user,
    }))

    const onChange=useCallback((e)=>{
        const {name, value}=e.target;

        if(name==='email')
            setEmail(value);
        else if(name==='password')
            setPassword(value);
    }, []);
    const onToggle=useCallback((e)=>{
        const {checked}=e.target;

        setChecked(checked);
    }, []);
    const onSubmit=useCallback((event)=>{
        event.preventDefault();

        if(email===''){
            setEmpty(prev=>({...prev, email:true}));

            if(password===''){
                setEmpty(prev=>({...prev, password:true}));
                
                return;
            }

            return;
        }
        if(password===''){
            setEmpty(prev=>({...prev, password:true}));
            
            return;
        }

        setEmpty({email:false, password:false})
        dispatch(login({email, password}));
    }, [email, password, dispatch]);

    useEffect(()=>{
        if(authError){
            return;
        }
        if(auth){
            dispatch(check());
        }
    }, [auth, authError, dispatch]);
    useEffect(()=>{
        if(user){
            history.go(-1);
        }

        try{
            localStorage.setItem('user', JSON.stringify(user));
        } catch(e){
            console.error('localStorage is not working');
        }
    }, [user, history]);

    return  <LogIn 
                onChange={onChange} 
                onToggle={onToggle} 
                onSubmit={onSubmit} 
                email={email} 
                password={password} 
                checked={checked}
                error={authError}
                empty={empty}
            />
};

export default withRouter(LoginCon);