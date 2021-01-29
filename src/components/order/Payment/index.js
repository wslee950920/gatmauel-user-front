import React, { useCallback } from "react";
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

import PhoneVerify from "../../common/Phone/PhoneVerify";
import AddrInput from "../../common/Address/AddrInput";
import Money from "./Money";
import RequestText from "./RequestText";
const AddrCon = loadable(() => import("../../../containers/payment/AddrCon"));

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

const Payment = ({
  open,
  handleClose,
  deli,
  getTotal,
  insertComma,
  value,
  handleChange,
  handleMouseDown,
  clearAddress,
  addrRef,
  addr,
  error,
  handleClickOpen,
  detail,
  detailChange,
  detailRef,
  phone,
  phoneChange,
  checkPhone,
  verify,
  timer,
  codeOnChange,
  code,
  helper,
  confirmPhone,
  platform,
  aOpen,
  addressClose,
  addrOnClick,
  addressExit,
  charge,
  radio,
  radioOnChange,
}) => {
  const classes = useStyles();

  const a11yProps = useCallback((index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }, []);

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
                  detailChange={detailChange}
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
              error={error.code}
              timer={timer}
              codeOnChange={codeOnChange}
              code={code}
              helper={helper}
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
            <RequestText radio={radio} radioOnChange={radioOnChange} />
            <Money
              insertComma={insertComma}
              getTotal={getTotal}
              charge={charge}
            />
          </Container>
        </div>
      </Dialog>
      {!!deli && platform && (
        <AddrCon
          open={aOpen}
          handleClose={addressClose}
          addrOnClick={addrOnClick}
          handleOnExit={addressExit}
        />
      )}
    </>
  );
};

export default React.memo(Payment);
