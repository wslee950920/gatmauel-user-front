import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';

import { user as userAPI } from "../../lib/api/client";
import {getPlatform} from '../../lib/usePlatform';
import useTimer from '../../lib/useTimer';

import { setTempPhone, setTempAddress, makeOrder } from "../../modules/order";

import Payment from '../../components/order/Payment';

const PaymentCon=({ 
  open, 
  handleClose, 
  deli, 
  getTotal,  
  temp, 
  distance,
  changeDistance
})=>{
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
  const [aOpen, setAOpen] = useState(false);
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
  const { info, order, result, oError }=useSelector(state=>(
    {
        info:state.user.info,
        order:state.order.order,
        result:state.order.result,
        oError:state.order.error
    }
  ));
  const history=useHistory();

  const charge=useMemo(()=>{
    if(!!deli&&distance){
      if(distance<2000){
        return 2000;
      } else if(distance>=2000&&distance<4000){
        return 2500;
      } else if(distance>=4000){
        return 3000;
      }
    } else{
      return 0
    }
  }, [distance, deli]);

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

    if(!confirm||phone===''){
      setError(prev=>({
        ...prev,
        phone:true
      }));

      return;
    }

    if(!!deli&&(error.addr||error.detail)){
      return;
    }
    if(error.phone){
      return;
    }

    if(!!deli&&(addr===''||detail==='')){
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
      deli:!!deli, 
      request:`${radio}\n${text}`,
      total:!!deli?getTotal+charge:getTotal
    }));
  }, [dispatch, error, confirm, addr, detail, phone, order, text, radio, deli, getTotal, charge]);
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
      setAOpen(true);

      return;
    } else {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setAddr(data.address);
          dispatch(setTempAddress(data.address));

          userAPI.get('/api/order/distance', {
            params:{
              goal:data.address
            }
          }).then((res)=>{
            changeDistance(res.data.distance);
          }).catch((err)=>{
            if(err){
              if(err.response.status===404){
                alert('주소를 찾을 수 없습니다.');
              } else{
                alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
              }
            }
          });

          detailRef.current.focus();
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
    setAddr(addr);
    setAOpen(false);
    dispatch(setTempAddress(addr));

    userAPI.get('/api/order/distance', {
      params:{
        goal:addr
      }
    }).then((res)=>{
      changeDistance(res.data.distance);
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
    setAOpen(false);
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
    if(result){
      alert('결제가 완료되었습니다.');
      history.push('/result');
    }
  }, [result, history]);
  useEffect(()=>{
    if(oError){
      alert('결제에 실패했습니다. 잠시 후 다시 시도해주십시오.');
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
    if(open){
      if(temp.address){
        setAddr(temp.address);
        setDetail('');
      } else if(info&&info.address){
        setAddr(info.address);
        setDetail(info.detail);
      } else{
        setAddr('');
        setDetail('');
      }
    }
  }, [temp.address, info, open]);
  useEffect(() => {
    if(open){  
      if(info&&info.phone){
        setPhone(info.phone);
      } else if(temp.phone){
        setPhone(temp.phone);
      } else{
        setPhone('');
      }
    }
  }, [info, temp.phone, open]);

    return (
        <Payment 
            open={open} 
            handleClose={handleClose} 
            deli={deli} 
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
            aOpen={aOpen}
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

export default React.memo(PaymentCon);