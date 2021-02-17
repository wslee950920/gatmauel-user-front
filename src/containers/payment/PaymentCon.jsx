import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';

import { user as userAPI } from "../../lib/api/client";
import { getPlatform } from '../../lib/usePlatform';
import useTimer from '../../lib/useTimer';

import { setTempPhone, setTempAddress, MakeOrder } from "../../modules/order";
import { getInfo } from "../../modules/user";

import Payment from '../../components/payment';
import useGetTotal from "../../lib/useGetTotal";

const PaymentCon = ({
  history,
  match
}) => {
  const { method } = match.params;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [addr, setAddr] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState({
    addr: false,
    detail: false,
    code: '',
    phone: false
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
  const [radio, setRadio] = useState('5분이내 거리(조리)');
  const [text, setText] = useState('');
  const { info, order, temp, user, uError, loading } = useSelector(state => (
    {
      info: state.user.info,
      order: state.order.order,
      temp: state.order.temp,
      user: state.user.user,
      uError: state.user.error,
      loading: state.loading['user/GET_INFO'],
    }
  ));
  const [distance, setDistance] = useState(null);
  const getTotal = useGetTotal(order);
  const [measure, setMeasure] = useState(null);
  const [wait, setWait]=useState(false);
  const popup=useRef(null);
  const timer=useRef(null);

  const charge = useMemo(() => {
    let basic = 0;
    let extra = 0;

    if (method === 'delivery') {
      if (getTotal >= 40000) {
        basic = 0;
      } else if (getTotal >= 27000 && getTotal < 40000) {
        basic = 500;
      } else if (getTotal < 27000) {
        basic = 1000;
      }

      if (distance) {
        if (distance < 2000) {
          extra = 2000;
        } else if (distance >= 2000 && distance < 4000) {
          extra = 2500;
        } else if (distance >= 4000) {
          extra = 3000;
        }
      }

      return basic + extra;
    } else return 0;
  }, [distance, method, getTotal]);

  const onChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name === 'text') {
      setText(value);
    } else if (name === 'five') {
      setRadio(value);
    } else if (name === 'measure') {
      setMeasure(value);
    } else if (name === 'code') {
      setError((prev) => ({ ...prev, code: '' }));

      const curValue = value;
      const newValue = curValue.replace(/[^0-9]/g, "");
      setCode(newValue);
    } else if (name === 'detail') {
      setError((prev) => ({ ...prev, detail: false }));
      setDetail(value);
    }
  }, [])
  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (!measure) {
      alert('결제수단을 선택해주세요.');

      return;
    }

    if (method === 'delivery') {
      if (addr === '' || detail === '') {
        if (addr === '') {
          setError(prev => ({
            ...prev,
            addr: true
          }));
        }
        if (detail === '') {
          setError(prev => ({
            ...prev,
            detail: true
          }));
        }

        return;
      }

      if (distance > 5000) {
        alert('거리 5km이상 지역은 배달이 불가합니다.');
        setError(prev => ({ ...prev, addr: true }));

        return;
      }

      if(!distance){
        return;
      }
    }
    if (!confirm || phone === '') {
      setError(prev => ({
        ...prev,
        phone: true
      }));

      return;
    }

    if (method === 'delivery' && (error.addr || error.detail)) {
      return;
    }
    if (error.phone) {
      return;
    }

    setError(prev => ({ ...prev, addr: false, detail: false, phone: false }));
    setWait(true);

    userAPI.post(`/api/order/pay/${measure}`, {
      address:addr,
      detail,
      phone,
      order: order.map((value) => {
        return ({
          id: value.id,
          num: value.num,
          name: value.name
        })
      }),
      deli: method === 'delivery',
      request: `${radio}\n${text}`,
      total: getTotal + charge,
    }).then(({data})=>{
      if(measure==='kakao'){
        if(platform){
          popup.current=window.open(data.result.next_redirect_mobile_url, '_blank');        
        } else{
          popup.current=window.open(data.result.next_redirect_pc_url, '카카오페이', 'width=450, height=650, left=100, top=150')
        }
      } else if(measure==='later'){
        dispatch(MakeOrder(data));
        history.push('/result');
      }
    }).catch((err)=>{
      if(err.response){
        if(err.response.status===406||
          err.response.status===403||
          err.response.status===401
        ){
          setError(prev=>({...prev, phone:true}));
          alert('전화번호 인증을 해주세요.');

          return;
        }
      }

      alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
    })
  }, [dispatch, history, measure, distance, platform, error, confirm, addr, detail, phone, order, text, radio, method, getTotal, charge]);
  const phoneChange = useCallback(
    (e) => {
      const { value } = e.target;
      setPhone(value);
      setError(prev => ({
        ...prev,
        phone: false
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
    setError((prev) => ({ ...prev, code: '', phone:false }));
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

        setError((prev) => ({ ...prev, code: '', phone: false }));
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
              setError(prev => ({ ...prev, code: "인증번호가 만료되었습니다." }));
            } else if (error.response.status === 404) {
              setError(prev => ({ ...prev, code: "인증번호가 틀렸습니다." }));
            } else if (error.response.status === 403) {
              setError(prev => ({ ...prev, code: "전화번호가 다릅니다." }));
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
    setError((prev) => ({ ...prev, addr: false, detail: false }));

    if (platform) {
      setOpen(true);

      return;
    } else {
      new window.daum.Postcode({
        oncomplete: (data) => {
          dispatch(setTempAddress(data.address));
        },
        onclose: () => {
          addrRef.current.blur();
        },
      }).open({
        popupName: "postcodePopup",
      });
    }
  }, [platform, dispatch]);
  const addrOnClick = useCallback((addr) => {
    setOpen(false);
    dispatch(setTempAddress(addr));
  }, [dispatch]);
  const addressExit = useCallback(() => {
    addrRef.current.blur();
  }, []);
  const addressClose = useCallback(() => {
    if (distance > 5000) {
      setError(prev => ({ ...prev, addr: true }));
    }

    setOpen(false);
  }, [distance]);
  const clearAddress = useCallback(() => {
    setError(prev => ({ ...prev, addr: false }));
    detailRef.current.blur();
    setAddr("");
  }, []);
  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);
  const handleChange = useCallback((event, newValue) => {
    if (user) {
      setError(prev => ({ ...prev, addr: false, detail: false }));
      setValue(newValue);
    }
  }, [user]);

  useEffect(()=>{
    if(wait){
      const loop=()=>{
        if(popup.current&&popup.current.closed){
          setWait(false);

          return;
        }
          
        timer.current=setTimeout(loop, 300);     
      }
      setTimeout(loop, 1500);
    }
  }, [wait]);
  useEffect(() => {
    if (method === 'delivery') {
      if (addr) {
        userAPI.get('/api/order/distance', {
          params: {
            goal: addr
          }
        }).then((res) => {
          if (res.data.distance > 5000) {
            alert('거리 5km이상 지역은 배달이 불가합니다.');
            setError(prev => ({ ...prev, addr: true }));
          } else {
            detailRef.current.focus();
          }

          setDistance(res.data.distance);
        }).catch((err) => {
          if (err) {
            if (err.response.status === 404) {
              alert('주소를 찾을 수 없습니다.');
            } else {
              alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
            }
          }
        })
      }
    }
  }, [addr, method]);
  useEffect(() => {
    if (order.length === 0) {
      alert('메뉴를 추가해주세요.');
      history.push('/menu');

      return;
    }

    if (getTotal < 14000) {
      alert('14,000원 이상부터 주문하실 수 있습니다.');
      history.push('/menu');

      return;
    }
  }, [order, history, getTotal]);
  useEffect(() => {
    setPlatform(getPlatform());

    return () => {
      if (es && es.current) {
        es.current.close();
      }

      if(timer&&timer.current){
        clearTimeout(timer.current);
      }

      //unmount state update failed
      setAddr('');
      setDetail('');
      setPhone('');
    };
  }, []);
  useEffect(()=>{
    const msgCallback=(event)=>{
      if(event.origin==='http://localhost:9090'){
        if(event.data){
          if(event.data.success){
            dispatch(MakeOrder(event.data.success));
            history.push('/result');
          } else if(event.data.cancel){
            alert(event.data.cancel);
            setWait(false);
          } else if(event.data.fail){
            alert(event.data.fail);
            setWait(false);
          }
        }
      }
    }
    window.addEventListener('message', msgCallback);

    return ()=>{
      window.removeEventListener('message', msgCallback);
    }
  }, [dispatch, history]);
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
      } else if (info && info.address) {
        setAddr(info.address);
        setDetail(info.detail);
      } else {
        setAddr("");
        setDetail("");
      }
    } else if (value === 1) {
      if (user) {
        userAPI.get('/api/order/recent').then((result) => {
          if (result.data.length === 1) {
            setAddr(result.data[0].address);
            setDetail(result.data[0].detail);
          }
        });
      }
    }
  }, [value, temp.address, info, method, user]);
  useEffect(() => {
    if (temp.phone) {
      setPhone(temp.phone);
    } else if (info && info.phone) {
      setPhone(info.phone);
    } else {
      setPhone('');
    }
  }, [info, temp.phone]);
  useEffect(() => {
    if (info) return;
    if (uError) return;
    if (loading) return;

    dispatch(getInfo());
  }, [dispatch, info, uError, loading]);

  return (
    <Payment
      deli={method === 'delivery'}
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
      measure={measure}
      wait={wait}
    />
  );
}

export default withRouter(PaymentCon);