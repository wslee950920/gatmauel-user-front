import React, {useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {withRouter} from 'react-router-dom';

import FindInfo from '../../components/find';

import {user as userAPI} from '../../lib/api/client';
import {check} from '../../modules/user';

const FindCon=({history})=>{
    const [nickname, setNickname]=useState('');
    const [phone, setPhone]=useState('');
    const [email, setEmail]=useState('');
    const [value, setValue] = useState(0);
    const [result, setResult]=useState('');
    const [error, setError]=useState({
        nickname:false,
        phone:false,
        email:false
    })
    const {user}=useSelector(state => (
        {
          user: state.user.user,
        }
    ));
    const dispatch=useDispatch();

    const handleChange = useCallback((event, newValue) => {
        setNickname('');
        setPhone('');
        setEmail('');

        setError({
            nickname:false,
            phone:false,
            email:false
        });

        setValue(newValue);
    }, []);
    const onChange=useCallback((e)=>{
        const {name, value}=e.target;

        if(name==='nickname'){
            setNickname(value);
            setError(prev=>({
                ...prev,
                nickname:false
            }))
        } else if(name==='phone'){
            setPhone(value);
            setError(prev=>({
                ...prev,
                phone:false
            }))
        } else if(name==='email'){
            setEmail(value);
            setError(prev=>({
                ...prev,
                email:false
            }))
        }

        setResult('');
    }, []);
    const onSubmit=useCallback((e)=>{
        e.preventDefault();

        if(nickname===''){
            setError(prev=>({...prev, nickname:true}));

            return;
        }
        if(phone===''){
            setError(prev=>({...prev, phone:true}));

            return;
        }
        if(value===1&&email===''){
            setError(prev=>({...prev, email:true}));

            return;
        }

        userAPI.post(`/api/auth/find/${value===0?'email':'password'}`, {
            nickname,
            phone,
            ...(value===1&&{
                email
            })
        }).then(({data, status})=>{
            setError({
                nickname:false,
                phone:false,
                email:false
            });
            
            if(status===201){
                alert('비밀번호가 초기화 되었습니다. 이메일을 확인해주세요.');

                return;
            }
            setResult(data.email);
        }).catch((error)=>{
            if(error.response){
                if(error.response.status===404){
                    alert('존재하지 않는 회원입니다.');

                    return;
                } else if(error.response.status===403){
                    alert('SNS로그인 회원입니다.');

                    return;
                }
            }
            
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오');
        })
    }, [nickname, phone, email, value]);

    useEffect(()=>{
        if(user){
            history.push('/');
        }
    }, [history, user]);
    useEffect(()=>{
        dispatch(check());
    }, [dispatch]);

    return (
        <FindInfo 
            nickname={nickname} 
            phone={phone} 
            email={email}
            onChange={onChange}
            handleChange={handleChange}
            value={value}
            error={error}
            onSubmit={onSubmit}
            result={result}
        />
    );
}

export default withRouter(FindCon);