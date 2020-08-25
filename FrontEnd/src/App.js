import React from "react";

// import config from "./utils/config";
import config from "./config";
import LoginScreen from "./screens/auth/login";
import RegisterScreen from "./screens/auth/register";
import HomeScreen from "./screens/dashboard/home";

import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={() => <Redirect to="/login" />} />
          <Route
            path="/login"
            component={() => <LoginScreen cookies={props.cookies} />}
          />
          <Route
            path="/register"
            component={() => <RegisterScreen cookies={props.cookies} />}
          />
          <Route
            path="/home"
            component={() => <HomeScreen cookies={props.cookies} />}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default withCookies(App);
