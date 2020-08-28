import React from "react";

// import config from "./utils/config";
import config from "./config";
import LoginScreen from "./screens/auth/login";
import RegisterScreen from "./screens/auth/register";
import HomeScreen from "./screens/dashboard/home";
import ProjectsScreen from "./screens/dashboard/projects";
import TasksScreen from "./screens/dashboard/tasks";
import SingleProjectScreen from "./screens/dashboard/singleProject";
import SingleTaskScreen from "./screens/dashboard/singleTask";
import UsersScreen from "./screens/dashboard/users";

import { Route, Redirect, BrowserRouter } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { connect } from "react-redux";
import { logOutUser } from "./actions/loginAction";

const App = (props) => {
  return (
    <div>
      <div className="container--center">
        <h1 style={{ textAlign: "center" }}>Project Management System</h1>
        {window.localStorage.getItem("token") && (
          <div style={{ flexDirection: "row" }}>
            <span>
              User: {window.localStorage.getItem("display_name")} {"   "}
              Role: {window.localStorage.getItem("role")}
            </span>
            <Button variant="primary" onClick={() => props.logOutUser()}>
              Log Out
            </Button>
          </div>
        )}
      </div>
      <br />
      <BrowserRouter>
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
            component={() => <SingleProjectScreen />}
          />
          <Route
            path="/task/:id"
            exact
            component={() => <SingleTaskScreen />}
          />
          <Route path="/users/" exact component={() => <UsersScreen />} />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps, { logOutUser })(App);
