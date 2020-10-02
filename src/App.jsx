import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

import MainPage from "./page/Main";
const LoginPage = loadable(() => import("./page/Login"));
const RegisterPage = loadable(() => import("./page/Register"));
const ProfilePage = loadable(() => import("./page/Profile"));
const AccountPage = loadable(() => import("./page/Account"));
const FindPage = loadable(() => import("./page/Find"));
const NoticePage = loadable(() => import("./page/Notice"));
const ReviewPage = loadable(() => import("./page/Review"));

const App = () => {
  return (
    <Switch>
      <Route path={["/", "/main"]} component={MainPage} exact={true} />
      <Route path={"/login"} component={LoginPage} exact />
      <Route path={"/register"} component={RegisterPage} exact />
      <Route path={"/profile"} component={ProfilePage} exact />
      <Route path={"/account"} component={AccountPage} exact />
      <Route path={"/find"} component={FindPage} exact />
      <Route path={"/notice"} component={NoticePage} exact />
      <Route path={"/review"} component={ReviewPage} exact />
      <Route
        render={() => (
          <div>
            <br />
            <h2>존재하지 않는 페이지입니다.</h2>
          </div>
        )}
      />
    </Switch>
  );
};

export default App;