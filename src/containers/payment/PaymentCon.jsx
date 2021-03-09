import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import crypto from "crypto";

import { user as userAPI } from "../../lib/api/client";
import usePlatform from "../../lib/usePlatform";
import useTimer from "../../lib/useTimer";

import { setTempPhone, setTempAddress } from "../../modules/order";
import { getInfo } from "../../modules/user";

import Payment from "../../components/payment";
import useGetTotal from "../../lib/useGetTotal";

const PaymentCon = ({ history, match }) => {
  const { method } = match.params;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [addr, setAddr] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState({
    addr: false,
    detail: false,
    code: "",
    phone: false,
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
  const [radio, setRadio] = useState("5분이내 거리(조리)");
  const [text, setText] = useState("");
  const { info, order, temp, user, uError, loading } = useSelector((state) => ({
    info: state.user.info,
    order: state.order.order,
    temp: state.order.temp,
    user: state.user.user,
    uError: state.user.error,
    loading: state.loading["user/GET_INFO"],
  }));
  const [distance, setDistance] = useState(null);
  const getTotal = useGetTotal(order);
  const [measure, setMeasure] = useState(null);
  const [wait, setWait] = useState(false);
  const imp = useRef(null);
  const platform = usePlatform();

  const charge = useMemo(() => {
    let basic = 0;
    let extra = 0;

    if (method === "delivery") {
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
    if (name === "text") {
      setText(value);
    } else if (name === "five") {
      setRadio(value);
    } else if (name === "measure") {
      setMeasure(value);
    } else if (name === "code") {
      setError((prev) => ({ ...prev, code: "" }));

      const curValue = value;
      const newValue = curValue.replace(/[^0-9]/g, "");
      setCode(newValue);
    } else if (name === "detail") {
      setError((prev) => ({ ...prev, detail: false }));
      setDetail(value);
    }
  }, []);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!measure) {
        alert("결제수단을 선택해주세요.");

        return;
      }

      if (method === "delivery") {
        if (addr === "" || detail === "") {
          if (addr === "") {
            setError((prev) => ({
              ...prev,
              addr: true,
            }));
          }
          if (detail === "") {
            setError((prev) => ({
              ...prev,
              detail: true,
            }));
          }

          return;
        }

        if (distance > 5000) {
          alert("거리 5km이상 지역은 배달이 불가합니다.");
          setError((prev) => ({ ...prev, addr: true }));

          return;
        }

        if (!distance) {
          return;
        }
      }
      if (!confirm || phone === "") {
        setError((prev) => ({
          ...prev,
          phone: true,
        }));

        return;
      }

      if (method === "delivery" && (error.addr || error.detail)) {
        return;
      }
      if (error.phone) {
        return;
      }

      setError((prev) => ({
        ...prev,
        addr: false,
        detail: false,
        phone: false,
      }));
      setWait(true);

      try {
        const orderId = await crypto
          .randomBytes(5)
          .toString("hex")
          .toUpperCase();
        await userAPI
          .post(`/order/pay/${measure}`, {
            orderId,
            address: method === "delivery" ? addr : "",
            detail: method === "delivery" ? detail : "",
            phone,
            order: order.map((value) => {
              return {
                id: value.id,
                num: value.num,
                name: value.name,
              };
            }),
            deli: method === "delivery",
            request: `${radio}. ${text}`,
            total: getTotal + charge,
          })
          .then(({ data }) => {
            if (measure === "kakao") {
              if (platform) {
                window.location.href = data.result.next_redirect_mobile_url;
              } else {
                window.location.href = data.result.next_redirect_pc_url;
              }
            } else if (measure === "card") {
              if (imp.current) {
                imp.current.request_pay(
                  {
                    pg: "html5_inicis",
                    pay_method: "card",
                    merchant_uid: orderId,
                    name:
                      `${order[0].name}` +
                      (order.length > 1 ? ` 외 ${order.length - 1}` : ""),
                    amount: getTotal + charge,
                    tax_free: 0,
                    buyer_tel: phone,
                    buyer_name: user ? user.nick : `gatmauel${phone.slice(-4)}`,
                    buyer_email: "",
                    m_redirect_url: `https://user.gatmauel.com/@user/order/mobile`,
                  },
                  (resp) => {
                    if (resp.success) {
                      history.push(`/result?orderId=${orderId}`);
                    } else {
                      if (resp.error_msg === "사용자가 결제를 취소하셨습니다") {
                        userAPI
                          .get(`/order/cancel?orderId=${orderId}`)
                          .then(() => {
                            alert(resp.error_msg);
                            history.push("/order");
                          })
                          .catch((err) => {
                            alert(err.message);
                            setWait(false);
                          });
                      } else {
                        userAPI
                          .get(`/order/fail?orderId=${orderId}`)
                          .then(() => {
                            alert(resp.error_msg);
                            setWait(false);
                          })
                          .catch((err) => {
                            alert(err.message);
                            setWait(false);
                          });
                      }
                    }
                  }
                );
              }
            } else if (measure === "later") {
              history.push(`/result?orderId=${orderId}`);
            }
          })
          .catch((err) => {
            if (err.response) {
              if (
                err.response.status === 406 ||
                err.response.status === 403 ||
                err.response.status === 401
              ) {
                setError((prev) => ({ ...prev, phone: true }));
                alert("전화번호 인증을 해주세요.");
                setConfirm(false);
                setWait(false);
              } else {
                alert("결제를 실패하였습니다. 잠시 후 다시 시도해주십시오.");
                setWait(false);
              }
            } else {
              alert(err.message);
              setWait(false);
            }
          });
      } catch (error) {
        alert(error.message);
      }
    },
    [
      history,
      user,
      measure,
      distance,
      platform,
      error,
      confirm,
      addr,
      detail,
      phone,
      order,
      text,
      radio,
      method,
      getTotal,
      charge,
    ]
  );
  const phoneChange = useCallback(
    (e) => {
      const { value } = e.target;
      setPhone(value);
      setError((prev) => ({
        ...prev,
        phone: false,
      }));

      if (info && value === info.phone) {
        setConfirm(true);
      } else if (temp && value === temp.phone) {
        setConfirm(true);
      } else {
        setConfirm(false);
      }
    },
    [info, temp]
  );
  const checkPhone = useCallback(() => {
    setError((prev) => ({ ...prev, code: "", phone: false }));
    setCode("");

    if (confirm) {
      return;
    }

    userAPI
      .post("/user/phone", { phone })
      .then((res) => {
        setVerify(true);

        const temp = new Date(res.data.updatedAt);
        temp.setMinutes(temp.getMinutes() + 3);
        setEnd(temp);
      })
      .catch((e) => {
        if (e.response) {
          alert("오류가 발생했습니다. 잠시 후 다시 시도해주십시오.");
        } else {
          alert(e.message);
        }
      });
  }, [phone, confirm]);
  const confirmPhone = useCallback(() => {
    if (code === "") {
      return;
    }

    userAPI
      .post("/user/temp", { code, phone })
      .then(() => {
        dispatch(setTempPhone(phone));

        setError((prev) => ({ ...prev, code: "", phone: false }));
        setConfirm(true);
        setVerify(false);
        setSse(null);
        setEnd(null);

        es.current.close();
      })
      .catch((error) => {
        setConfirm(false);

        if (error.response) {
          if (error.response.status === 419) {
            setError((prev) => ({
              ...prev,
              code: "인증번호가 만료되었습니다.",
            }));
          } else if (error.response.status === 404) {
            setError((prev) => ({ ...prev, code: "인증번호가 틀렸습니다." }));
          } else if (error.response.status === 403) {
            setError((prev) => ({ ...prev, code: "전화번호가 다릅니다." }));
          } else {
            alert("오류가 발생했습니다. 잠시 후 다시 시도해주십시오.");
          }
        } else {
          alert(error.message);
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
          if (distance > 5000 && addr) {
            setError((prev) => ({ ...prev, addr: true }));
            alert("거리 5km이상 지역은 배달이 불가합니다.");
          }
          addrRef.current.blur();
        },
      }).open({
        popupName: "postcodePopup",
      });
    }
  }, [platform, dispatch, distance, addr]);
  const addrOnClick = useCallback(
    (addr) => {
      setOpen(false);
      dispatch(setTempAddress(addr));
    },
    [dispatch]
  );
  const addressClose = useCallback(() => {
    if (distance > 5000 && addr) {
      setError((prev) => ({ ...prev, addr: true }));
      alert("거리 5km이상 지역은 배달이 불가합니다.");
    }

    setOpen(false);
    addrRef.current.blur();
  }, [distance, addr]);
  const clearAddress = useCallback(() => {
    setError((prev) => ({ ...prev, addr: false }));
    dispatch(setTempAddress(""));
    detailRef.current.blur();
    setAddr("");
  }, [dispatch]);
  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);
  const handleChange = useCallback(
    (event, newValue) => {
      if (user) {
        setError((prev) => ({ ...prev, addr: false, detail: false }));
        setValue(newValue);
      }
    },
    [user]
  );

  useEffect(() => {
    if (method === "delivery") {
      if (addr) {
        userAPI
          .get("/order/distance", {
            params: { goal: addr },
          })
          .then((res) => {
            if (res.data.distance > 5000) {
              addrRef.current.blur();
              alert("거리 5km이상 지역은 배달이 불가합니다.");
              setError((prev) => ({ ...prev, addr: true }));
            } else {
              detailRef.current.focus();
            }

            setDistance(res.data.distance);
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              setError((prev) => ({ ...prev, addr: true }));
              alert("주소를 찾을 수 없습니다.");
              addrRef.current.blur();
            } else {
              alert(err.message);
            }
          });
      }
    }
  }, [addr, method]);
  useEffect(() => {
    if (order.length === 0) {
      alert("메뉴를 추가해주세요.");
      history.push("/menu");

      return;
    }

    if (getTotal < 14000) {
      alert("14,000원 이상부터 주문하실 수 있습니다.");
      history.push("/menu");

      return;
    }
  }, [order, history, getTotal]);
  useEffect(() => {
    if (!imp.current && window.IMP) {
      imp.current = window.IMP;
      imp.current.init(process.env.REACT_APP_IAMPORT);
    }

    return () => {
      if (es && es.current) {
        es.current.close();
      }

      //unmount state update failed
      setAddr("");
      setDetail("");
      setPhone("");
      setText("");
      setWait(false);
    };
  }, []);
  useEffect(() => {
    if (verify) {
      es.current = new EventSource(
        process.env.NODE_ENV === "production"
          ? "https://user.gatmauel.com/@user/user/timer"
          : "https://localhost/@user/user/timer"
      );

      es.current.onmessage = (e) => {
        setSse(new Date(parseInt(e.data, 10)));
      };
    }
  }, [verify]);
  useEffect(() => {
    if (value === 0) {
      if (temp.address) {
        setAddr(temp.address);
        setDetail("");
      } else if (info && info.address) {
        setAddr(info.address);
        setDetail(info.detail);
      } else {
        setAddr("");
        setDetail("");
      }
    } else if (value === 1) {
      if (user) {
        userAPI.get("/order/recent").then((result) => {
          if (result.data.length === 1) {
            setAddr(result.data[0].address);
            setDetail(result.data[0].detail);
          }
        });
      }
    }
  }, [value, temp, info, method, user]);
  useEffect(() => {
    if (temp.phone) {
      setPhone(temp.phone);
    } else if (info && info.phone) {
      setPhone(info.phone);
    } else {
      setPhone("");
    }
  }, [info, temp]);
  useEffect(() => {
    if (info) return;
    if (uError) return;
    if (loading) return;

    dispatch(getInfo());
  }, [dispatch, info, uError, loading]);

  return (
    <Payment
      deli={method === "delivery"}
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
      charge={charge}
      radio={radio}
      text={text}
      onChange={onChange}
      onSubmit={onSubmit}
      measure={measure}
      wait={wait}
    />
  );
};

export default withRouter(PaymentCon);
