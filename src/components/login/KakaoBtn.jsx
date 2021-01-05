import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  kakaoBtn: {
    padding: 0,
  },
}));

const KakaoBtn = ({onClick}) => {
  const classes = useStyles();

  return (
    <Button fullWidth classes={{ text: classes.kakaoBtn }} onClick={onClick}>
      <img src="/images/icons/kakao_login.png" alt="카카오로그인" style={{ width: "100%" }} />
    </Button>
  );
};

export default React.memo(KakaoBtn);
