import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import LogIn from '../../components/login';

import {fetchLogin, initAuth} from '../../modules/auth';
import {check, tempSetUser} from '../../modules/user';

import {user as userAPI} from '../../lib/api/client';

const LoginCon=({history})=>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [checked, setChecked]=useState(false);
    const [error, setError]=useState({
        email:false,
        password:false
    });
    const dispatch=useDispatch();
    const {login, loginError, user}=useSelector(({auth, user})=>({
        login:auth.login,
        loginError:auth.loginError,
        user:user.user,
    }));

    const onClick=useCallback(()=>{
        window.Kakao.Auth.login({
            success:(res)=>{
                window.Kakao.Auth.setAccessToken(res.access_token);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success:(info)=>{
                        const phone=info.kakao_account.phone_number.replace('+82 ', '0').replace(/-/g,'');

                        userAPI.post('/api/auth/kakao/v2', {
                          snsId:info.id,
                          email:info.kakao_account.email,
                          eVerified:info.kakao_account.is_email_verified,
                          nick:info.kakao_account.profile.nickname,
                          phone
                        })
                        .then((res)=>{
                            dispatch(tempSetUser(res.data));
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

        if(name==='email'){
            setError(prev=>({...prev, email:false}));
            setEmail(value);
        }
        else if(name==='password'){
            setError(prev=>({...prev, password:false}));
            setPassword(value);
        }
    }, []);
    const onToggle=useCallback((e)=>{
        const {checked}=e.target;

        setChecked(checked);
    }, []);
    const onSubmit=useCallback((event)=>{
        event.preventDefault();

        if(error.email||error.password){
            return;
        }

        if(email===''||password===''){
            if(email===''){
                setError(prev=>({...prev, email:true}));
            } 
            if(password===''){
                setError(prev=>({...prev, password:true}));
            }
            return;
        }
        if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            setError(prev=>({...prev, email:true}));
            alert('이메일을 입력해주십시오');
            return;
        }

        setError({email:false, password:false});
        dispatch(fetchLogin({email, password, checked}));
    }, [email, password, dispatch, checked, error]);

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
            if(loginError&&loginError.response){
                if(loginError.response.status===400){
                    setError(prev=>({...prev, email:true}));
                    alert('이메일을 입력해주십시오.');

                    return;
                }
                if(loginError.response.status===401){
                    setError({email:true, password:false});

                    return;
                }
                else if(loginError.response.status===403){
                    alert('이메일 인증을 해주세요.');
                    
                    return;
                }
                else if(loginError.response.status===406){
                    dispatch(check());

                    return;
                }
                else if(loginError.response.status===409){
                    alert('SNS 로그인을 해주세요.');

                    return;
                }

                throw loginError;
            }
            if(login){
                dispatch(tempSetUser(login.data));
            }
        } catch(e){
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오');
        }
    }, [login, loginError, dispatch]);
    useEffect(()=>{
        if(user){
            history.push('/');

            try{
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e){
                console.log('localStorage is not working');
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
                onClick={onClick}
            />
};

export default withRouter(LoginCon);