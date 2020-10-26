import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Templete from "./temp";
//import App from './App'
//App컴포넌트는 자체 화면을 가지지 않는, 오직 라우터 기능만 있는
//라우터 컴포넌트이기 때문에 전역 css를 그대로 가지고 있다.
//App컴포넌트를 jsx에 넣으면 App컴포넌트의 style, script, link들을 추출한다.
//서버에서 추출한 것들과 App컴포넌트를 html 템플릿에 담아 보낸다.
//브라우저가 받은 html을 그대로 렌더링하면 root 요소에 있는 내용이 App컴포넌트
//이므로 라우팅에의해 MainPage를 렌더링한다. 그런데 html 템플릿에 담겨 있는
//css, link, script 등이 아무 화면을 가지지 않았던, App컴포넌트의 것이었기 때문에
//전역 css등이 MainPage에 적용되어 MainPage의 화면이 깨지게 된다.
//MainPage를 jsx에 넣고 서버에서 렌더링하면, tags의 속성들이 MainPage의
//style, link, script이고, root요소의 내용도 MainPage의 것이므로
//화면이 깨지지 않는다.
//나의 경우에는 MainPage에 cs를 적용하지 않았으므로 미리 chunk들을 추출할
//필요는 없었던 것 같다. 책의 20.5장은 적용할 필요 없었을 듯.

import express from "express";
import path from "path";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./module";
import PreloadContext from "./lib/PreloadContext";

const statsFile = path.resolve("./build/loadable-stats.json");

const createPage = (root, tags) => {
  return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <link rel="icon" href="/images/icons/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="갯마을 바지락 칼국수 보쌈 홈페이지" />
          <meta name="author" content="WSL" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="갯마을" />
          <link rel="apple-touch-icon" href="/images/icons/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <!-- Google Fonts -->
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <!-- Font Awesome -->
          <link 
            rel="stylesheet" 
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          />
          <!-- Bootstrap core CSS -->
          <link 
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" 
            rel="stylesheet"
          />
          <!-- Material Design Bootstrap -->
          <link 
            href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" 
            rel="stylesheet"
          />
          <title>갯마을</title>
          ${tags.styles}
          ${tags.links}
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root">
            ${root}
          </div>
          ${tags.scripts}
        </body>
    </html>
    `;
};

const app = express();

const serverRender = async (req, res, next) => {
  const context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const extractor = new ChunkExtractor({ statsFile });
  const preloadContext = {
    done: false,
    promises: [],
  };
  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <PreloadContext.Provider value={preloadContext}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Templete />
            </ThemeProvider>
          </StaticRouter>
        </Provider>
      </PreloadContext.Provider>
    </ChunkExtractorManager>
  );
  ReactDOMServer.renderToStaticMarkup(jsx);
  try {
    await Promise.all(preloadContext.promises);
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;

  const root = ReactDOMServer.renderToString(jsx);
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`;
  const tags = {
    scripts: stateScript + extractor.getScriptTags(),
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
  };

  res.send(createPage(root, tags));
};
const serve = express.static(path.resolve("./build"), {
  index: false,
});

app.use(serve);
//app.use(serverRender);는 요청 url이 어떻든 요청이 오기만 하면 실행 된다.
//baseURL을 전역 설정하지 않았을 때 클라는 자신을 보내준 곳(localhost:5000)으로
//요청을 보낸다. 게다가 localhost:5000/api/review/list로 요청을 보냈음에도
//불구하고 app.use(serverRender)는 좋다고 serverRender를 실행해서 html템플릿을
//응답으로 보내준다. 그래서 reviews가 html템플릿이 되었던 것.
app.get("/", serverRender);

app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});
