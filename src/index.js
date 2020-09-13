import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//mdbreact 설정
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//material ui font 설정
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const rk = {
  fontFamily: "Recipe Korea",
  src: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Recipekorea.woff') format('woff')`,
  fontWeight: "normal",
  fontStyle: "normal",
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Recipe Korea",
  },
  palette: {
    primary: {
      main: "#2196f3",
      light: "#4dabf5",
      dark: "#1769aa",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 350,
      md: 960,
    },
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
