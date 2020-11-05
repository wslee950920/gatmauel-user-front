import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Templete from "./temp";

import express from "express";
import path from "path";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import createPage from "./createPage";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer, { rootSaga } from "./modules";
import PreloadContext from "./lib/PreloadContext";
import createSagaMiddleware, { END } from "redux-saga";

const statsFile = path.resolve("./build/loadable-stats.json");

const app = express();

const serverRender = async (req, res, next) => {
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
  store.dispatch(END);

  try {
    await sagaPromise;
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

const serve = express.static(path.resolve("./build"), { index: false });
app.use(serve);
//app.use(serverRender);는 요청 url이 어떻든 요청이 오기만 하면 실행 된다.
//baseURL을 전역 설정하지 않았을 때 클라는 자신을 보내준 곳(localhost:5000)으로
//요청을 보낸다. 게다가 localhost:5000/api/review/list로 요청을 보냈음에도
//불구하고 app.use(serverRender)는 좋다고 serverRender를 실행해서 html템플릿을
//응답으로 보내준다. 그래서 reviews가 html템플릿이 되었던 것.
app.use(serverRender);

app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});
