import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Main from "./page/Main";
//import App from './App'
//ssr이란, 화면을 서버에서 렌더링하여 클라이언트로 보내주는 것이다.
//그런데, App컴포넌트는 자체 화면이 없는, 라우터 컴포넌트(?)이기 때문에
//ssr에 적합하지 않다.
//아래에서 html템플릿에 주입하는 tags의 속성 값들은 Main페이지의 것이다.
//그래서 App을 jsx에 넣어 렌더링하면 스타일 등이 제대로 적용되지 않는다.

import express from "express";
import path from "path";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";

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

const serverRender = (req, res, next) => {
  const context = {};
  const extractor = new ChunkExtractor({ statsFile });
  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Main />
        </ThemeProvider>
      </StaticRouter>
    </ChunkExtractorManager>
  );
  ReactDOMServer.renderToStaticMarkup(jsx);

  const root = ReactDOMServer.renderToString(jsx);
  const tags = {
    scripts: extractor.getScriptTags(),
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
  };

  console.log("ssr");
  res.send(createPage(root, tags));
};
const serve = express.static(path.resolve("./build"), {
  index: false,
});

app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log(process.env.NODE_ENV, "Running on http://localhost:5000");
});
