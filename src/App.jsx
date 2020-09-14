import React from "react";
import { Route } from "react-router-dom";
import loadable from "@loadable/component";

import MainPage from "./page/Main";
const LoginPage = loadable(() => import("./page/Login"));

const App = () => {
  return (
    <>
      <Route path={["/", "/main"]} component={MainPage} exact={true} />
      <Route path={"/login"} component={LoginPage} />
    </>
  );
};

export default App;
