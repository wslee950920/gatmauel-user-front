import React from "react";
import { Route } from "react-router-dom";

import Home from "./page/Home";

const App = () => {
  return (
    <>
      <Route path="/home" component={Home} />
    </>
  );
};

export default App;
