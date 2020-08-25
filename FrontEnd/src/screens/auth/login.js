import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { loginToServer } from "../../actions/loginAction";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (window.localStorage.getItem("token")) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="container--center">
      <br />
      <br />
      <br />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          block
          onClick={() => props.loginToServer(email, password)}
        >
          Login
        </Button>
        <br />
        {props.login.error && (
          <Alert variant="danger">{props.login.error}</Alert>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  // return {
  //   loginToSever: (email, password) => {
  //     dispatch(login(email, password));
  //   },
  // };
};

export default connect(mapStateToProps, { loginToServer })(LoginScreen);
