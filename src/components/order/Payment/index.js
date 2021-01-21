import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import loadable from "@loadable/component";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
  fontMaple: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Payment = ({ open, handleClose, deli, info }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [addr, setAddr] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState({
    addr: false,
    detail: false,
  });
  const addrRef = useRef(null);
  const [aOpen, setAOpen] = useState(false);
  const [kakao, setKakao] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [query, setQuery] = useState("");
  const detailRef = useRef(null);

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
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
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
    const filter = "win16|win32|win64|macintel|mac";
    if (
      navigator.platform &&
      filter.indexOf(navigator.platform.toLowerCase()) > 0
    ) {
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
  }, []);

  useEffect(() => {
    if (value === 0) {
      if (info) {
        setAddr(info.address ? info.address : "");
        setDetail(info.detail ? info.detail : "");
      }
    } else if (value === 1) {
      setAddr("");
      setDetail("");
    }
  }, [info, value]);

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
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                >
                  <InputLabel htmlFor={`outlined-adornment-delivery`}>
                    시/군/구
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    name="address"
                    id={`outlined-adornment-delivery`}
                    label="시/군/구"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="clear address"
                          edge="end"
                          onMouseDown={handleMouseDown}
                          onClick={clearAddress}
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{
                      className: classes.fontMaple,
                      onClick: handleClickOpen,
                    }}
                    value={addr}
                    error={error.addr}
                    inputRef={addrRef}
                  />
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  name="detail"
                  label="상세주소"
                  size="small"
                  InputProps={{ className: classes.fontMaple }}
                  value={detail}
                  onChange={detailChange}
                  error={error.detail}
                  inputRef={detailRef}
                />
              </div>
            </Container>
          )}
          <Container maxWidth="sm">
            <div>포장</div>
          </Container>
        </div>
      </Dialog>
      {!!deli && (
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
