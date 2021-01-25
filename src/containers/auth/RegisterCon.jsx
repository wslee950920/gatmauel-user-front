import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Register from '../../components/register';

import { register, checkNick, initAuth } from '../../modules/auth';
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
    const { auth, authError, nick, nickError, user } = useSelector(({ auth, user }) => ({
        auth: auth.auth,
        authError: auth.authError,
        nick: auth.nick,
        nickError: auth.nickError,
        user:user.user
    }));

    const onChange = useCallback((e) => {
        const { name, value } = e.target;

        if (name === 'email'){
            setEmail(value);
        }
        else if (name === 'password'){
            setPassword(value);
        }
        else if (name === 'confirm'){
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

        if ((password !== confirm)||(password==='')||(confirm==='')){
            setError(prev => ({ ...prev, same: true }))

            if(email===''||!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
                setError(prev=>({...prev, email:true}));

                if(nickname===''||nickError){
                    setError(prev=>({...prev, nick:true}));
                    return;
                }
                return;
            } else setError(prev=>({...prev, email:false}));
            return;
        } else setError(prev=>({...prev, same:false}))
        if(email===''||!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            setError(prev=>({...prev, email:true}));

            if(nickname===''||nickError){
                setError(prev=>({...prev, nick:true}));
                return;
            }
            return;
        } else setError(prev=>({...prev, email:false}));
        if(nickname===''||nickError){
            setError(prev=>({...prev, nick:true}));
            return;
        } 

        setError(prev => ({ ...prev, email: false, same: false }))
        dispatch(register({ nick: nickname, email, password }));
    }, [nickname, email, password, confirm, dispatch, nickError]);

    useEffect(()=>{
        dispatch(check());

        return ()=>{
            dispatch(initAuth());
        }
    }, [dispatch]);
    useEffect(() => {
        try{
            if (authError) {
                if (authError.response&&authError.response.status===409){
                    setError(prev => ({ ...prev, email: true }));

                    return;
                }
    
                throw authError;
            }
            if (auth) {
                dispatch(initAuth());
                history.push('/login');
                alert('이메일 인증을 해주세요.');
            }
        } catch(e){
            console.error(e)
        }
    }, [auth, authError, history, dispatch]);
    useEffect(() => {
        if(user){
            history.push('/');

            return;
        }
    }, [user, history]);
    useEffect(() => {
        try{
            if (nickError) {
                setError(prev => ({ ...prev, nick: true }));
    
                return;
            }
            if (nick) {
                setError(prev => ({ ...prev, nick: false }));
            }
        } catch(e){
            console.error(e);
        }
    }, [nickError, nick, dispatch]);

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

