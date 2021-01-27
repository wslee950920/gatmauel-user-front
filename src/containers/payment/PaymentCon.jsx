import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { user as userAPI } from "../../lib/api/client";

import { setTempPhone, setTempAddress } from "../../modules/order";

import Payment from '../../components/order/Payment';

const PaymentCon=({ 
  open, 
  handleClose, 
  deli, 
  getTotal, 
  insertComma, 
  info, 
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
    code: false,
  });
  const addrRef = useRef(null);
  const [aOpen, setAOpen] = useState(false);
  const [kakao, setKakao] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [query, setQuery] = useState("");
  const detailRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [verify, setVerify] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [end, setEnd] = useState(null);
  const [sse, setSse] = useState(null);
  const [code, setCode] = useState("");
  const [helper, setHelper] = useState("");
  const es = useRef(null);
  const [platform, setPlatform] = useState(null);

  const timer = useMemo(() => {
    if (sse && end) {
      if (sse >= end) {
        return "00:00";
      } else {
        const temp = end - sse;
        const seconds = ("0" + Math.floor((temp / 1000) % 60)).slice(-2);
        const minutes = ("0" + Math.floor((temp / 1000 / 60) % 60)).slice(-2);

        return minutes + ":" + seconds;
      }
    } else {
      return "";
    }
  }, [sse, end]);
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

  const phoneChange = useCallback(
    (e) => {
      const { value } = e.target;
      setPhone(value);

      if (info && value === info.phone) {
        setConfirm(true);
      } else {
        setConfirm(false);
      }
    },
    [info]
  );
  const checkPhone = useCallback(() => {
    setError((prev) => ({ ...prev, code: false }));
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
  const codeOnChange = useCallback((e) => {
    setError((prev) => ({ ...prev, code: false }));

    const curValue = e.target.value;
    const newValue = curValue.replace(/[^0-9]/g, "");
    setCode(newValue);
  }, []);
  const confirmPhone = useCallback(() => {
    if (code === "") {
      return;
    }

    userAPI
      .post("/api/user/temp", { code, phone })
      .then(() => {
        dispatch(setTempPhone(phone));

        setError((prev) => ({ ...prev, code: false }));
        setConfirm(true);
        setVerify(false);
        setSse(null);
        setEnd(null);

        es.current.close();
      })
      .catch((error) => {
        setError((prev) => ({ ...prev, code: true }));
        setConfirm(false);

        if (error) {
          if (error.response) {
            if (error.response.status === 419) {
              setHelper("인증번호가 만료되었습니다.");
            } else if (error.response.status === 404) {
              setHelper("인증번호가 틀렸습니다.");
            } else if (error.response.status === 403) {
              setHelper("전화번호가 다릅니다.");
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
    if (platform) {
      //모바일
      setAOpen(true);
      setError((prev) => ({ ...prev, addr: false }));

      return;
    } else {
      //PC
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
  const getAddress = useCallback((query, page) => {
    setLoading(true);

    axios
      .get("https://dapi.kakao.com/v2/local/search/address.json", {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
        },
        params: {
          query,
          page,
        },
      })
      .then((response) => {
        if (page === 1) {
          setKakao(response.data.documents);
        } else {
          setKakao((prev) => [...prev, ...response.data.documents]);
        }
        setHasNextPage(!response.data.meta.is_end);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setHasNextPage(false);
        }
      });
  }, []);
  const loadNextPage = useCallback(
    ({ startIndex }) => {
      const page = Math.ceil(startIndex / 10) + 1;
      getAddress(query, page);
    },
    [query, getAddress]
  );
  const queryOnChange = useCallback(
    (e) => {
      const { value } = e.target;
      setQuery(value);
      getAddress(value, 1);
    },
    [getAddress]
  );
  const addressExit = useCallback(() => {
    addrRef.current.blur();
  }, []);
  const addressClose = useCallback(() => {
    setAOpen(false);
  }, []);
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
  
  const clearAddress = useCallback(() => {
    setAddr("");
  }, []);
  const detailChange = useCallback((e) => {
    setError((prev) => ({ ...prev, detail: false }));

    const { value } = e.target;
    setDetail(value);
  }, []);
  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);
  const a11yProps = useCallback((index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }, []);

  useEffect(() => {
    const filter = "win16|win32|win64|macintel|mac";
    setPlatform(
      navigator.platform && filter.indexOf(navigator.platform.toLowerCase()) < 0
    );

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
            insertComma={insertComma} 
            value={value}
            handleChange={handleChange}
            a11yProps={a11yProps}
            handleMouseDown={handleMouseDown}
            clearAddress={clearAddress}
            addrRef={addrRef}
            addr={addr}
            error={error}
            handleClickOpen={handleClickOpen}
            detail={detail}
            detailChange={detailChange}
            detailRef={detailRef}
            phone={phone}
            phoneChange={phoneChange}
            checkPhone={checkPhone}
            verify={verify}
            timer={timer}
            codeOnChange={codeOnChange}
            code={code}
            helper={helper}
            confirmPhone={confirmPhone}
            platform={platform}
            aOpen={aOpen}
            addressClose={addressClose}
            kakao={kakao}
            loadNextPage={loadNextPage}
            loading={loading}
            hasNextPage={hasNextPage}
            queryOnChange={queryOnChange}
            query={query}
            addrOnClick={addrOnClick}
            addressExit={addressExit}
            charge={charge}
        />
    );
}

export default React.memo(PaymentCon);