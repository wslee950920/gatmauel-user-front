import React, { useCallback, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import OrderList from "../common/Order/OrderList";
import Money from "../common/Order/Money";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "solid #dcdcdc",
    borderRadius: "8px",
    padding: theme.spacing(0, 1, 0.8),
    backgroundColor: "white",
  },
  root: {
    padding: theme.spacing(0.8),
  },
  header: {
    padding: theme.spacing(0.5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "1rem",
    paddingTop: theme.spacing(0.8),
  },
  tabs: {
    marginBottom: theme.spacing(0.5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  background: {
    padding: theme.spacing(0, 1, 0.8),
  },
  input: {
    fontFamily: "MaplestoryOTFBold",
    color: "black",
  },
  btn: {
    margin: theme.spacing(3, 0, 1),
    backgroundColor: theme.palette.primary.light,
  },
  label: {
    color: theme.palette.common.white,
  },
  typo: {
    fontFamily: "Roboto",
    marginBottom: theme.spacing(3),
  },
  textarea: {
    width: "100%",
    padding: theme.spacing(1),
    borderColor: "rgba(0, 0, 0, 0.23)",
    borderRadius: theme.spacing(0.5),
    color: "black",
    backgroundColor: "white",
  },
}));

const Result = ({ details, getTotal, order }) => {
  const classes = useStyles();

  const phone = useMemo(() => {
    const temp = order.phone.split("");
    temp.splice(3, 0, "-");
    temp.splice(-4, 0, "-");

    return temp.join("");
  }, [order]);

  const a11yProps = useCallback((index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="xs">
          <div className={classes.header}>
            <div className={classes.text}>결제 확인</div>
          </div>
        </Container>
        {order.deli && (
          <Container maxWidth="xs" className={classes.background}>
            <Tabs
              value={0}
              aria-label="address tabs"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <Tab label="배달 주소" {...a11yProps(0)} />
            </Tabs>
            <div
              role="tabpanel"
              id={`address-tabpanel`}
              aria-labelledby={`address-tab`}
            >
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                size="small"
                inputProps={{
                  className: classes.input,
                }}
                type="tel"
                value={order.address}
                disabled={true}
                label="시/군/구"
                InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.54)" } }}
              />
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                size="small"
                inputProps={{
                  className: classes.input,
                }}
                value={order.detail}
                disabled={true}
                label="상세주소"
                InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.54)" } }}
              />
            </div>
          </Container>
        )}
        <Container maxWidth="xs" className={classes.background}>
          <Tabs
            value={0}
            aria-label="phone tabs"
            indicatorColor="primary"
            className={classes.tabs}
          >
            <Tab label="전화번호" {...a11yProps(1)} />
          </Tabs>
          <div
            role="tabpanel"
            id={`phone-tabpanel`}
            aria-labelledby={`phone-tab`}
          >
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
              inputProps={{
                className: classes.input,
              }}
              value={phone}
              disabled={true}
            />
          </div>
        </Container>
        <Container maxWidth="xs" className={classes.background}>
          <Tabs
            value={0}
            aria-label="request tabs"
            indicatorColor="primary"
            className={classes.tabs}
          >
            <Tab label="요청사항" {...a11yProps(2)} />
          </Tabs>
          <div
            role="tabpanel"
            id={`request-tabpanel`}
            aria-labelledby={`request-tab`}
          >
            <TextareaAutosize
              className={classes.textarea}
              aria-label="request text area"
              rowsMin={3}
              rowsMax={3}
              value={order.request}
              disabled
            />
          </div>
        </Container>
        <Container maxWidth="xs" className={classes.background}>
          <Tabs
            value={0}
            aria-label="menu tabs"
            indicatorColor="primary"
            className={classes.tabs}
          >
            <Tab label="주문 메뉴" {...a11yProps(3)} />
          </Tabs>
        </Container>
        <Container className={classes.container} maxWidth="xs">
          <OrderList order={details} result />
        </Container>
        <Container maxWidth="xs" className={classes.background}>
          <Money getTotal={getTotal} charge={order.total - getTotal} />
          <Button
            fullWidth
            variant="contained"
            className={classes.btn}
            color="primary"
            classes={{ label: classes.label }}
            component={RouterLink}
            to="/"
          >
            확인
          </Button>
          <Typography
            align="right"
            variant="caption"
            display="block"
            className={classes.typo}
            color="textSecondary"
          >
            *문의사항은 홈 화면 아래 전화번호로 문의해주세요.
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default React.memo(Result);
