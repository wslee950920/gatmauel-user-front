import React, { useCallback } from "react";
import loadable from "@loadable/component";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import PhoneVerify from "../common/Phone/PhoneVerify";
import AddrInput from "../common/Address/AddrInput";
import Money from "../common/Order/Money";
import RequestText from "./RequestText";
const AddrCon = loadable(() => import("../../containers/payment/AddrCon"));

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
  submit: {
    margin: theme.spacing(5, 0, 2),
    backgroundColor: theme.palette.primary.light,
  },
}));

const Payment = ({
  deli,
  getTotal,
  value,
  handleChange,
  handleMouseDown,
  clearAddress,
  addrRef,
  addr,
  error,
  handleClickOpen,
  detail,
  detailRef,
  phone,
  phoneChange,
  checkPhone,
  verify,
  timer,
  code,
  confirmPhone,
  platform,
  open,
  addressClose,
  addrOnClick,
  addressExit,
  charge,
  radio,
  text,
  onSubmit,
  onChange,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const a11yProps = useCallback((index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }, []);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Container maxWidth="sm" className={classes.top}>
          <div className={classes.header}>
            <IconButton
              edge="start"
              size="small"
              onClick={() => history.goBack()}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <div className={classes.text}>
              {deli ? "배달 결제하기" : "포장 결제하기"}
            </div>
          </div>
        </Container>
        {deli && (
          <Container maxWidth="sm" className={classes.background}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="address tabs"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <Tab label="배달 주소" {...a11yProps(0)} />
              <Tab label="최근 주소" {...a11yProps(1)} />
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
                detailChange={onChange}
                detailRef={detailRef}
                value={value}
                dense
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
            error={{
              code: error.code,
              phone: error.phone,
            }}
            timer={timer}
            codeOnChange={onChange}
            code={code}
            confirmPhone={confirmPhone}
            value={0}
          />
          <Tabs
            aria-label="request tabs"
            indicatorColor="primary"
            className={classes.tabs}
            value={0}
          >
            <Tab label="요청사항" {...a11yProps(4)} />
          </Tabs>
          <RequestText radio={radio} text={text} onChange={onChange} />
          <Money getTotal={getTotal} charge={charge} />
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
          >
            결제하기
          </Button>
        </Container>
      </div>
      {deli && platform && (
        <AddrCon
          open={open}
          handleClose={addressClose}
          addrOnClick={addrOnClick}
          handleOnExit={addressExit}
        />
      )}
    </>
  );
};

export default React.memo(Payment);
