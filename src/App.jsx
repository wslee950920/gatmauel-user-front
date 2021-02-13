import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

const MainPage = loadable(()=>import('./page/Main'));
const LoginPage = loadable(() => import("./page/Login"));
const RegisterPage = loadable(() => import("./page/Register"));
const ProfilePage = loadable(() => import("./page/Profile"));
const AccountPage = loadable(() => import("./page/Account"));
const FindPage = loadable(() => import("./page/Find"));
const NoticePage = loadable(() => import("./page/Notice"));
const ReviewPage = loadable(() => import("./page/Review"));
const MenuPage = loadable(()=>import('./page/Menu'));
const MapPage=loadable(()=>import('./page/Map'), {ssr:false});
const OrderPage=loadable(()=>import('./page/Order'));
const ResultPage=loadable(()=>import('./page/Result'));
const PaymentPage=loadable(()=>import('./page/Payment'));

const App = () => {
  return (
    <Switch>
      <Route path={"/"} component={MainPage} exact/>
      <Route path={"/login"} component={LoginPage} exact />
      <Route path={"/register"} component={RegisterPage} exact />
      <Route path={"/profile"} component={ProfilePage} exact />
      <Route path={"/account"} component={AccountPage} exact />
      <Route path={"/find"} component={FindPage} exact />
      <Route path={"/notice"} component={NoticePage}/>
      <Route path={"/review"} component={ReviewPage} />
      <Route path={'/menu'} component={MenuPage} exact/>
      <Route path={'/map'} component={MapPage} exact/>
      <Route path={'/order'} component={OrderPage} exact/>
      <Route path={'/result'} component={ResultPage} exact/>
      <Route path={'/payment/:method'} component={PaymentPage} exact/>
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
