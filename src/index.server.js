import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

const statsFile = path.resolve("./build/loadable-stats.json");

const createPage = (root, tags, css) => {
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
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <title>갯마을</title>
            <style id="jss-server-side">${css}</style>
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
  const sheets = new ServerStyleSheets();
  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.url} context={context}>
        {sheets.collect(
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        )}
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
  const css = sheets.toString();

  res.send(createPage(root, tags, css));
};
const serve = express.static(path.resolve("./build"), {
  index: false,
});

app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});
