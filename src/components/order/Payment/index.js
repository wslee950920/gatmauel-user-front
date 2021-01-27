import React from "react";
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
  total: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(2, 1.5, 0),
  },
  sizeOne: {
    fontSize: "1rem",
  },
  small: {
    fontSize: "0.7rem",
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
  a11yProps,
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
  kakao,
  loadNextPage,
  loading,
  hasNextPage,
  queryOnChange,
  query,
  addrOnClick,
  addressExit,
  charge,
}) => {
  const classes = useStyles();

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
            <div className={classes.total}>
              <div className={classes.small}>메뉴 : </div>
              <div className={classes.small}>{insertComma(getTotal)}</div>
            </div>
            <div className={classes.total}>
              <div className={classes.small}>배달료 : </div>
              <div className={classes.small}>{insertComma(charge)}</div>
            </div>
            <div className={classes.total}>
              <div className={classes.sizeOne}>총액 : </div>
              <div className={classes.sizeOne}>
                {insertComma(getTotal + charge)}
              </div>
            </div>
          </Container>
        </div>
      </Dialog>
      {!!deli && platform && (
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
