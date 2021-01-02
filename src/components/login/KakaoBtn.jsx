import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  kakaoBtn: {
    padding: 0,
  },
}));

const KakaoBtn = () => {
  const classes = useStyles();

  return (
    <Button fullWidth href='http://localhost:9090/api/auth/kakao' target="_blank" classes={{ text: classes.kakaoBtn }}>
      <img src="/images/icons/kakao_login.png" alt="카카오로그인" style={{ width: "100%" }} />
    </Button>
  );
};

export default KakaoBtn;
