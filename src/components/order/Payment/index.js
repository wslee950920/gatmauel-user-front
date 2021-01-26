import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import axios from "axios";
import loadable from "@loadable/component";
import { useDispatch } from "react-redux";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { user as userAPI } from "../../../lib/api/client";

import { setInfoPhone } from "../../../modules/user";

import PhoneVerify from "../../common/Phone/PhoneVerify";
import AddrInput from "../../common/Address/AddrInput";
const AddrDialog = loadable(() => import("../../common/Address/AddrDialog"));

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(0.5),
    position: "relative",
    display: "flex",
  },
  text: {
    fontSize: "1rem",
    paddingTop: theme.spacing(0.8),
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  tabs: {
    marginBottom: theme.spacing(0.5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  background: {
    padding: theme.spacing(0, 1, 0.8),
  },
  root: {
    padding: theme.spacing(0.8),
  },
  top: {
    marginBottom: theme.spacing(0.8),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Payment = ({ open, handleClose, deli, info }) => {
  const classes = useStyles();
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
  const [platform, setPlatform]=useState(null);

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

        console.log(res.data);
        const temp = new Date(res.data.updatedAt);
        temp.setMinutes(temp.getMinutes() + 3);
        console.log(temp);
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
  const addrOnClick = useCallback((addr) => {
    setTimeout(() => {
      detailRef.current.focus();
    }, 200);
    setAddr(addr);
    setAOpen(false);
  }, []);
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
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);
  const a11yProps = useCallback((index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }, []);
  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);
  const detailChange = useCallback((e) => {
    setError((prev) => ({ ...prev, detail: false }));

    const { value } = e.target;
    setDetail(value);
  }, []);
  const clearAddress = useCallback(() => {
    setAddr("");
  }, []);
  const addressExit = useCallback(() => {
    addrRef.current.blur();
  }, []);
  const addressClose = useCallback(() => {
    setAOpen(false);
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
          detailRef.current.focus();
        },
        onclose: () => {
          addrRef.current.blur();
        },
      }).open({
        popupName: "postcodePopup",
      });
    }
  }, [platform]);
  const confirmPhone = useCallback(() => {
    if (code === "") {
      return;
    }

    userAPI
      .post("/api/user/temp", { code, phone })
      .then(() => {
        dispatch(setInfoPhone(phone));

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

  useEffect(() => {
    const filter = "win16|win32|win64|macintel|mac";
    setPlatform(navigator.platform &&
      filter.indexOf(navigator.platform.toLowerCase()) < 0);

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
      if (info) {
        setAddr(info.address ? info.address : "");
        setDetail(info.detail ? info.detail : "");
      } else {
        setAddr("");
        setDetail("");
      }
    } else if (value === 1) {
      setAddr("경기도 수원시 팔달구 일월로18번길 4-26");
      setDetail("172동 1901호");
    }
  }, [info, value]);
  useEffect(() => {
    if (info) {
      setPhone(info.phone ? info.phone : "");
    }
  }, [info]);

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className={classes.root}>
          <CssBaseline />
          <Container maxWidth="sm" className={classes.top}>
            <div className={classes.header}>
              <IconButton onClick={handleClose} edge="start" size="small">
                <ArrowBackIosIcon />
              </IconButton>
              <div className={classes.text}>
                {!!deli ? "배달 결제하기" : "포장 결제하기"}
              </div>
            </div>
          </Container>
          {!!deli && (
            <Container maxWidth="sm" className={classes.background}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="address tabs"
                indicatorColor="primary"
                className={classes.tabs}
              >
                <Tab label="배달 정보" {...a11yProps(0)} />
                <Tab label="최근 정보" {...a11yProps(1)} />
              </Tabs>
              <div
                role="tabpanel"
                id={`address-tabpanel`}
                aria-labelledby={`address-tab`}
              >
                <AddrInput
                  handleMouseDown={handleMouseDown}
                  clearAddress={clearAddress}
                  addrRef={addrRef}
                  addr={addr}
                  error={{
                    addr: error.addr,
                    detail: error.detail,
                  }}
                  handleClickOpen={handleClickOpen}
                  detail={detail}
                  detailChange={detailChange}
                  detailRef={detailRef}
                  value={value}
                />
              </div>
            </Container>
          )}
          <Container maxWidth="sm" className={classes.background}>
            <Tabs
              aria-label="phone tabs"
              indicatorColor="primary"
              className={classes.tabs}
              value={0}
            >
              <Tab label="전화번호" {...a11yProps(3)} />
            </Tabs>
            <PhoneVerify
              phone={phone}
              phoneChange={phoneChange}
              checkPhone={checkPhone}
              verify={verify}
              error={error.code}
              timer={timer}
              codeOnChange={codeOnChange}
              code={code}
              helper={helper}
              confirmPhone={confirmPhone}
              value={0}
            />
          </Container>
        </div>
      </Dialog>
      {!!deli&&platform && (
        <AddrDialog
          open={aOpen}
          handleClose={addressClose}
          kakao={kakao}
          loadNextPage={loadNextPage}
          loading={loading}
          hasNextPage={hasNextPage}
          queryOnChange={queryOnChange}
          query={query}
          addrOnClick={addrOnClick}
          handleOnExit={addressExit}
        />
      )}
    </>
  );
};

export default React.memo(Payment);
