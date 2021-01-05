import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import LogIn from '../../components/login';

import {login, initAuth} from '../../modules/auth';
import {check} from '../../modules/user';

import {user as userAPI} from '../../lib/api/client';

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
    }));
    const [error, setError]=useState(false);

    const onClick=useCallback(()=>{
        window.Kakao.Auth.login({
            success:(res)=>{
                window.Kakao.Auth.setAccessToken(res.access_token);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success:(info)=>{
                        userAPI.post('/api/auth/kakao/v2', {
                          id:info.id,
                          email:info.kakao_account.email,
                          nick:info.kakao_account.profile.nickname
                        })
                        .then(()=>{
                          dispatch(check());
                        })
                        .catch((err)=>{
                          if(err.response.status===409){
                              alert('이미 가입된 이메일입니다.');
                          }
                        })
                    },
                    fail:()=>{
                        alert('카카오 로그인에 오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                    }
                });
            },
            fail:()=>{
                alert('카카오 로그인에 오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
            }
        });
    }, [dispatch]);
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

        setEmpty({email:false, password:false});
        dispatch(login({email, password, checked}));
    }, [email, password, dispatch, checked]);

    useEffect(()=>{          
        return()=>{
            dispatch(initAuth());
        }
    }, [dispatch]);
    useEffect(()=>{
        try{
            if(authError){
                if(authError.response&&authError.response.status===401){
                    setError(true);
                    dispatch(initAuth());

                    return;
                }
                else if(authError.response&&authError.response.status===403){
                    alert('SNS 로그인을 진행해주세요.');
                    dispatch(initAuth());
                    
                    return;
                }

                throw authError;
            }
            if(auth){
                dispatch(check());
            }
        } catch(e){
            console.error(e)
        }
    }, [auth, authError, dispatch]);
    useEffect(()=>{
        if(user){
            history.push('/');

            try{
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e){
                console.error('localStorage is not working');
            }
        }
    }, [user, history]);

    return  <LogIn 
                onChange={onChange} 
                onToggle={onToggle} 
                onSubmit={onSubmit} 
                email={email} 
                password={password} 
                checked={checked}
                error={error}
                empty={empty}
                onClick={onClick}
            />
};

export default withRouter(LoginCon);