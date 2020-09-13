import React from "react";
import { Route } from "react-router-dom";

import MainPage from "./page/Main";
import LoginPage from "./page/Login";

const App = () => {
  return (
    <>
      <Route path={["/", "/main"]} component={MainPage} exact={true} />
      <Route path={"/login"} component={LoginPage} />
    </>
  );
};

export default App;
