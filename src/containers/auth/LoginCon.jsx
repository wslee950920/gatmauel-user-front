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
        email:'',
        password:''
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
            setEmpty(prev=>({...prev, email:'이메일을 입력해주세요'}));

            return;
        }
        if(password===''){
            setEmpty(prev=>({...prev, email:'', password:'비밀번호를 입력해주세요.'}));

            return;
        }

        setEmpty({email:'', password:''})
        dispatch(login({email, password}));
    }, [email, password, dispatch]);

    useEffect(()=>{
        setEmail('');
        setPassword('');
    }, []);
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
            history.push('/');
        }
    }, [user, history]);

    return (
        <LogIn 
            onChange={onChange} 
            onToggle={onToggle} 
            onSubmit={onSubmit} 
            email={email} 
            password={password} 
            checked={checked}
            error={authError}
            empty={empty}
        />
    );
};

export default withRouter(LoginCon);