import React from "react";

// import config from "./utils/config";
import config from "./config";
import LoginScreen from "./screens/auth/login";
import RegisterScreen from "./screens/auth/register";
import HomeScreen from "./screens/dashboard/home";
import ProjectsScreen from "./screens/dashboard/projects";
import TasksScreen from "./screens/dashboard/tasks";
import SingleProectScreen from "./screens/dashboard/singleProject";

import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        Header Text
        <div>
          <Route path="/" exact component={() => <Redirect to="/login" />} />
          <Route path="/login" exact component={() => <LoginScreen />} />
          <Route path="/register" exact component={() => <RegisterScreen />} />
          <Route path="/home" exact component={() => <HomeScreen />} />
          <Route path="/projects" exact component={() => <ProjectsScreen />} />
          <Route path="/tasks" exact component={() => <TasksScreen />} />
          <Route
            path="/project/:id"
            exact
            component={() => <SingleProectScreen />}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default withCookies(App);
