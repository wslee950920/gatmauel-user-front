import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import LogIn from '../../components/login';

import {login, initAuth} from '../../modules/auth';
import {check, tempSetUser} from '../../modules/user';

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
                          snsId:info.id,
                          email:info.kakao_account.email,
                          eVerified:info.kakao_account.is_email_verified,
                          nick:info.kakao_account.profile.nickname
                        })
                        .then(()=>{
                            dispatch(tempSetUser(true));
                        })
                        .catch((err)=>{
                          if(err.response&&err.response.status===409){
                              alert('이미 가입된 이메일입니다.');
                          }
                          else if(err.response&&err.response.status===403){
                              alert('이메일 인증을 해주세요.');
                          }
                          else if(err.response&&err.response.status===406){
                              dispatch(check());
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
        if (window.Kakao) {
            const kakao = window.Kakao
            // 중복 initialization 방지
            if (!kakao.isInitialized()) {
              kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
            }
        }
    }, []);
    useEffect(()=>{       
        dispatch(check());

        return ()=>{
            dispatch(initAuth());
        }
    }, [dispatch]);
    useEffect(()=>{
        try{
            if(authError){
                if(authError.response&&authError.response.status===401){
                    setError(true);

                    return;
                }
                else if(authError.response&&authError.response.status===403){
                    alert('이메일 인증을 해주세요.');
                    
                    return;
                }
                else if(authError.response&&authError.response.status===406){
                    dispatch(check());

                    return;
                }
                else if(authError.response&&authError.response.status===409){
                    alert('SNS 로그인을 해주세요.');

                    return;
                }

                throw authError;
            }
            if(auth){
                dispatch(tempSetUser(true));
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