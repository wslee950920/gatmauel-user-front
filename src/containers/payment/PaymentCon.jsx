import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {withRouter} from 'react-router-dom';

import { user as userAPI } from "../../lib/api/client";
import {getPlatform} from '../../lib/usePlatform';
import useTimer from '../../lib/useTimer';

import { setTempPhone, setTempAddress, makeOrder } from "../../modules/order";

import Payment from '../../components/payment';
import useGetTotal from "../../lib/useGetTotal";

const PaymentCon=({
  history,
  match
})=>{
  const {method}=match.params;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [addr, setAddr] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState({
    addr: false,
    detail: false,
    code: '',
    phone:false
  });
  const addrRef = useRef(null);
  const [open, setOpen] = useState(false);
  const detailRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [verify, setVerify] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [end, setEnd] = useState(null);
  const [sse, setSse] = useState(null);
  const [code, setCode] = useState("");
  const es = useRef(null);
  const [platform, setPlatform] = useState(null);
  const [radio, setRadio]=useState('5분이내 거리(조리)');
  const [text, setText]=useState('');
  const { info, order, oError, temp, result }=useSelector(state=>(
    {
        info:state.user.info,
        order:state.order.order,
        oError:state.order.error,
        temp:state.order.temp,
        result:state.order.result
    }
  ));
  const [distance, setDistance]=useState(null);
  const getTotal=useGetTotal(order);

  const charge=useMemo(()=>{
    let basic=0;
    let extra=0;

    if(method==='delivery'){
      if(getTotal>=40000){
        basic=0;
      } else if(getTotal>=27000&&getTotal<40000){
        basic=500;
      } else if(getTotal<27000){
        basic=1000;
      }

      if(distance){
        if(distance<2000){
          extra=2000;
        } else if(distance>=2000&&distance<4000){
          extra=2500;
        } else if(distance>=4000){
          extra=3000;
        }
      }

      return basic+extra;
    } else return 0;
  }, [distance, method, getTotal]);

  const changeDistance=useCallback((d)=>{
    setDistance(d);
}, []);
  const onChange=useCallback((event)=>{
    const {name, value}=event.target;
    if(name==='text'){
      setText(value);
    } else if(name==='five'){
      setRadio(value);
    } else if(name==='code'){
      setError((prev) => ({ ...prev, code:'' }));

      const curValue = value;
      const newValue = curValue.replace(/[^0-9]/g, "");
      setCode(newValue);
    } else if(name==='detail'){
      setError((prev) => ({ ...prev, detail: false }));
      setDetail(value);
    }
  }, [])
  const onSubmit=useCallback((e)=>{
    e.preventDefault();

    if(method==='delivery'&&(addr===''||detail==='')){
      if(addr===''){
        setError(prev=>({
          ...prev,
          addr:true
        }));
      }
      if(detail===''){
        setError(prev=>({
          ...prev,
          detail:true
        }));
      }

      return;
    }
    if(!confirm||phone===''){
      setError(prev=>({
        ...prev,
        phone:true
      }));

      return;
    }

    if(method==='delivery'&&(error.addr||error.detail)){
      return;
    }
    if(error.phone){
      return;
    }

    setError(prev=>({...prev, addr:false, detail:false, phone:false}))
    dispatch(makeOrder({
      addr, 
      detail, 
      phone, 
      order:order.map((value)=>{
        return({
          id:value.id,
          num:value.num
        })
      }), 
      deli:method==='delivery', 
      request:`${radio}\n${text}`,
      total:method==='delivery'?getTotal+charge:getTotal
    }));
  }, [dispatch, error, confirm, addr, detail, phone, order, text, radio, method, getTotal, charge]);
  const phoneChange = useCallback(
    (e) => {
      const { value } = e.target;
      setPhone(value);
      setError(prev=>({
        ...prev,
        phone:false
      }));

      if (info && value === info.phone) {
        setConfirm(true);
      } else {
        setConfirm(false);
      }
    },
    [info]
  );
  const checkPhone = useCallback(() => {
    setError((prev) => ({ ...prev, code: '' }));
    setCode("");

    if (confirm) {
      return;
    }

    userAPI
      .post("/api/user/phone", { phone })
      .then((res) => {
        setVerify(true);

        const temp = new Date(res.data.updatedAt);
        temp.setMinutes(temp.getMinutes() + 3);
        setEnd(temp);
      })
      .catch((e) => {
        if (e) {
          if (e.response) {
            if (e.response.status === 409) {
              alert("이미 사용 중인 전화번호입니다.");
            } else {
              alert("오류가 발생했습니다. 잠시 후 다시 시도해주십시오.");
            }

            return;
          }

          alert("오류가 발생했습니다. 잠시 후 다시 시도해주십시오.");
        }
      });
  }, [phone, confirm]);
  const confirmPhone = useCallback(() => {
    if (code === "") {
      return;
    }

    userAPI
      .post("/api/user/temp", { code, phone })
      .then(() => {
        dispatch(setTempPhone(phone));

        setError((prev) => ({ ...prev, code:'', phone:false }));
        setConfirm(true);
        setVerify(false);
        setSse(null);
        setEnd(null);

        es.current.close();
      })
      .catch((error) => {
        setConfirm(false);

        if (error) {
          if (error.response) {
            if (error.response.status === 419) {
              setError(prev=>({...prev, code:"인증번호가 만료되었습니다."}));
            } else if (error.response.status === 404) {
              setError(prev=>({...prev, code:"인증번호가 틀렸습니다."}));
            } else if (error.response.status === 403) {
              setError(prev=>({...prev, code:"전화번호가 다릅니다."}));
            } else {
              alert("오류가 발생했습니다. 잠시 후 다시 시도해주십시오.");
            }

            return;
          }

          alert("오류가 발생했습니다. 잠시 후 다시 시도해주십시오.");
        }
      });
  }, [code, phone, dispatch]);
  const handleClickOpen = useCallback(() => {
    setError((prev) => ({ ...prev, addr: false, detail:false }));

    if (platform) {
      setOpen(true);

      return;
    } else {
      new window.daum.Postcode({
        oncomplete: (data) => {
          userAPI.get('/api/order/distance', {
            params:{
              goal:data.address
            }
          }).then((res)=>{
            if(res.data.distance>5000){
              setError(prev=>({...prev, addr:true}))
              alert('거리 5km이상 지역은 배달이 불가합니다.');

              return;
            }

            changeDistance(res.data.distance);
            dispatch(setTempAddress(data.address));
            detailRef.current.focus();
          }).catch((err)=>{
            if(err){
              if(err.response.status===404){
                alert('주소를 찾을 수 없습니다.');
              } else{
                alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
              }
            }
          });
        },
        onclose: () => {
          addrRef.current.blur();
        },
      }).open({
        popupName: "postcodePopup",
      });
    }
  }, [platform, dispatch, changeDistance]);
  const addrOnClick = useCallback((addr) => {
    setTimeout(() => {
      detailRef.current.focus();
    }, 200);

    userAPI.get('/api/order/distance', {
      params:{
        goal:addr
      }
    }).then((res)=>{
      if(res.data.distance>5000){
        setError(prev=>({...prev, addr:true}));
        alert('거리 5km이상 지역은 배달이 불가합니다.');

        return;
      }

      changeDistance(res.data.distance);
      setOpen(false);
      dispatch(setTempAddress(addr));
    }).catch((err)=>{
      if(err){
        if(err.response.status===404){
          alert('주소를 찾을 수 없습니다.');
        } else{
          alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
        }
      }
    });
  }, [dispatch, changeDistance]);
  const addressExit = useCallback(() => {
    addrRef.current.blur();
  }, []);
  const addressClose = useCallback(() => {
    setOpen(false);
  }, []);
  const clearAddress = useCallback(() => {
    setAddr("");
  }, []);
  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  useEffect(()=>{ 
    if(method==='delivery'){
      if(!distance){
        if(temp.address||(info&&info.address)){
          userAPI.get('/api/order/distance', {
            params:{
              goal:temp.address||info.address
            }
          }).then((res)=>{
            if(res.data.distance>5000){
              setError(prev=>({...prev, addr:true}))
              alert('거리 5km이상 지역은 배달이 불가합니다.');

              return;
            }

            setDistance(res.data.distance);
          }).catch((err)=>{
            if(err){
              if(err.response.status===404){
                alert('주소를 찾을 수 없습니다.');
              } else{
                alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
              }
            }
          })
        }
      }
    }   
  }, [distance, info, temp, method]);
  useEffect(()=>{
    if(order.length===0){
        alert('메뉴를 추가해주세요.');
        history.push('/menu');

        return;
    }

    if(getTotal<14000){
      alert('14,000원 이상부터 주문하실 수 있습니다.');
      history.push('/menu');

      return;
    }
  }, [order, history, getTotal]);
  useEffect(()=>{
    if(result){
      alert('결제에 성공하였습니다.');
      history.push('/result');
    }
  }, [result, history]);
  useEffect(()=>{
    if(oError){
      alert('결제에 실패하였습니다. 잠시 후 다시 시도해주십시오.');
    }
  }, [oError]);
  useEffect(() => {
    setPlatform(getPlatform());

    return () => {
      if (es && es.current) {
        es.current.close();
      }

      setAddr("");
      setDetail("");
      setPhone("");
    };
  }, []);
  useEffect(() => {
    if (verify) {
      es.current = new EventSource("http://localhost:9090/api/user/timer", {
        withCredentials: true,
      });

      es.current.onmessage = (e) => {
        setSse(new Date(parseInt(e.data, 10)));
      };
    }
  }, [verify]);
  useEffect(() => {
    if (value === 0) {
      if (temp.address) {
        setAddr(temp.address);
        setDetail('');
      } else if(info&&info.address){
        setAddr(info.address);
        setDetail(info.detail);
      } else {
        setAddr("");
        setDetail("");
      }
    } else if (value === 1) {
      setAddr("경기도 수원시 팔달구 일월로18번길 4-26");
      setDetail("172동 1901호");
    }
  }, [value, temp.address, info]);
  useEffect(() => {
    if(temp.phone){
      setPhone(temp.phone);
    } else if(info&&info.phone){
      setPhone(info.phone);
    } else{
      setPhone('');
    }
  }, [info, temp.phone]);

    return (
        <Payment  
          deli={method==='delivery'} 
          getTotal={getTotal}  
          value={value}
          handleChange={handleChange}
          handleMouseDown={handleMouseDown}
          clearAddress={clearAddress}
          addrRef={addrRef}
          addr={addr}
          error={error}
          handleClickOpen={handleClickOpen}
          detail={detail}
          detailRef={detailRef}
          phone={phone}
          phoneChange={phoneChange}
          checkPhone={checkPhone}
          verify={verify}
          timer={useTimer(sse, end)}
          code={code}
          confirmPhone={confirmPhone}
          platform={platform}
          open={open}
          addressClose={addressClose}
          addrOnClick={addrOnClick}
          addressExit={addressExit}
          charge={charge}
          radio={radio}
          text={text}
          onChange={onChange}
          onSubmit={onSubmit}
      />
    );
}

export default withRouter(PaymentCon);