import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//mdbreact 설정
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//material ui font 설정
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import RKttf from "./fonts/RK.ttf";
import CssBaseline from "@material-ui/core/CssBaseline";

const rk = {
  fontFamily: "Recipe Korea",
  src: `url(${RKttf}) format('truetype')`,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Recipe Korea",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [rk],
      },
    },
  },
});

const filter = "win16|win32|win64|macintel|mac|"; // PC일 경우 가능한 값
if (navigator.platform) {
  if (filter.indexOf(navigator.platform.toLowerCase()) < 0);
  else {
    alert("이 앱은 모바일 환경에 최적화되어 있습니다.");
  }
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
