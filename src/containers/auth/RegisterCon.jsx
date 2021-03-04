import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Register from '../../components/register';

import { fetchRegister, checkNick, initAuth } from '../../modules/auth';
import {check} from '../../modules/user';

const RegisterCon = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState({
        nick: false,
        email: false,
        same: false
    });

    const dispatch = useDispatch();
    const { register, registerError, nick, nickError, user } = useSelector(({ auth, user }) => ({
        register: auth.register,
        registerError: auth.registerError,
        nick: auth.nick,
        nickError: auth.nickError,
        user:user.user
    }));

    const onChange = useCallback((e) => {
        const { name, value } = e.target;

        if (name === 'email'){
            setError(prev=>({...prev, email:false}));
            setEmail(value);
        }
        else if (name === 'password'){
            setError(prev=>({...prev, same:false}));
            setPassword(value);
        }
        else if (name === 'confirm'){
            setError(prev=>({...prev, same:false}));
            setConfirm(value);
        }
        else if (name === 'nickname') {
            setNickname(value);

            if (value === ''){
                setError(prev=>({...prev, nick:false}));
                
                return;
            }

            dispatch(checkNick({ nick: value }));
        }
    }, [dispatch]);
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if(nickname===''||nickError){
            setError(prev=>({...prev, nick:true}));

            return;
        } 
        if(email===''||!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            setError(prev=>({...prev, email:true}));
            alert('이메일을 입력해주십시오');
            return;
        } 
        if ((password !== confirm)||(password==='')||(confirm==='')){
            setError(prev => ({ ...prev, same: true }))

            return;
        }

        setError(prev => ({ ...prev, email: false, same: false, nick:false }))
        dispatch(fetchRegister({ nick: nickname, email, password }));
    }, [nickname, email, password, confirm, dispatch, nickError]);

    useEffect(()=>{
        dispatch(check());

        return ()=>{
            dispatch(initAuth());
        }
    }, [dispatch]);
    useEffect(() => {
        if (registerError) {
            if (registerError.response){
                if(registerError.response.status===409||
                    registerError.response.status===400){
                    setError(prev => ({ ...prev, email: true }));
                }
            } else{
                alert(registerError.message);
            }
        } else if (register) {
            alert('이메일 인증을 해주세요.');
            history.push('/login');
        }
    }, [register, registerError, history]);
    useEffect(() => {
        if(user){
            history.push('/');

            return;
        }
    }, [user, history]);
    useEffect(() => {
        if (nickError) {
            setError(prev => ({ ...prev, nick: true }));
    
            return;
        }
        if (nick) {
            setError(prev => ({ ...prev, nick: false }));

            return;
        }
    }, [nickError, nick]);

    return <Register
                nickname={nickname}
                email={email}
                password={password}
                confirm={confirm}
                onSubmit={onSubmit}
                onChange={onChange}
                error={error}
            />
}

export default withRouter(RegisterCon);

