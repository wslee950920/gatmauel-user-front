import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Register from '../../components/register';
import Header from "../../components/header";
import Copyright from "../../components/footer/Copyright";

import { register, checkNick } from '../../modules/auth';

const RegisterCon = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState({
        nick: false,
        email: false,
        same: false
    })

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

            if (value !== '')
                dispatch(checkNick({ nick: value }));
        }
    }, [dispatch]);
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if ((password !== confirm)||(password==='')||(confirm==='')){
            setError(prev => ({ ...prev, same: true }))

            if(email===''||!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
                setError(prev=>({...prev, email:true}));

                if(nickname===''){
                    setError(prev=>({...prev, nick:true}));
                    return;
                }
                return;
            } else setError(prev=>({...prev, email:false}));
            return;
        } else setError(prev=>({...prev, same:false}))
        if(email===''||!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            setError(prev=>({...prev, email:true}));

            if(nickname===''){
                setError(prev=>({...prev, nick:true}));
                return;
            }
            return;
        } else setError(prev=>({...prev, email:false}));
        if(nickname===''){
            setError(prev=>({...prev, nick:true}));
            return;
        } 

        setError(prev => ({ ...prev, email: false, same: false }))
        dispatch(register({ nick: nickname, email, password }));
    }, [nickname, email, password, confirm, dispatch]);

    useEffect(() => {
        if(user){
            history.push('/');
            alert('로그인한 상태 입니다.');

            return;
        }

        setNickname('');
        setEmail('');
        setPassword('');
        setConfirm('');
    }, [user, history]);
    useEffect(() => {
        if (authError) {
            if (authError.response.status === 999)
                setError(prev => ({ ...prev, email: true }));
            else if (authError.response.status === 888)
                setError(prev => ({ ...prev, email: false}));

            return;
        }
        if (auth) {
            history.push('/login');
            alert('로그인을 해주세요.')
        }
    }, [auth, authError, history]);
    useEffect(() => {
        if (nickError) {
            setError(prev => ({ ...prev, nick: true }));

            return;
        }
        if (nick) {
            setError(prev => ({ ...prev, nick: false }));
        }
    }, [nickError, nick])

    return (
        <>
            <Header main user={user}/>
            <Register
                nickname={nickname}
                email={email}
                password={password}
                confirm={confirm}
                onSubmit={onSubmit}
                onChange={onChange}
                error={error}
            />
            <Copyright />
        </>
    )
}

export default withRouter(RegisterCon);

