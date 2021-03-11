import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

import express from "express";
import path from "path";
import { ChunkExtractor } from "@loadable/server";
import cookieParser from "cookie-parser";
import "./server/env";
import createPage from "./server/createPage";
import connection from "./server/mysql";
import counter from "./server/counter";
import logger from "./server/logger";

connection.connect((err) => {
  if (err) {
    logger.error(err);
  }
});

import { ThemeProvider, ServerStyleSheets } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer, { rootSaga } from "./modules";
import PreloadContext from "./lib/PreloadContext";
import createSagaMiddleware, { END } from "redux-saga";

const statsFile = path.resolve("./build/loadable-stats.json");

const app = express();

app.use(cookieParser());
app.use(counter);

const serverRender = async (req, res, next) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, sagaMiddleware)
  );
  const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();
  const preloadContext = {
    done: false,
    promises: [],
  };
  const extractor = new ChunkExtractor({ statsFile });
  const temp = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );
  ReactDOMServer.renderToStaticMarkup(temp);
  store.dispatch(END);

  try {
    await sagaPromise;
    await Promise.all(preloadContext.promises);
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;

  const jsx = extractor.collectChunks(temp);
  const root = ReactDOMServer.renderToString(sheets.collect(jsx));
  const css = sheets.toString();
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`;
  const tags = {
    scripts: stateScript + extractor.getScriptTags(),
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
    css,
  };

  res.send(createPage(root, tags));
};

const serve = express.static(path.resolve("./build"), { index: false });
app.use(serve);
app.use(serverRender);

app.listen(5000);
