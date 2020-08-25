import React, { useState } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { loginToServer } from "../../actions/loginAction";

const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  return (
    <div className="container--center">
      <br /><br /><br />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control as="select">
            <option>Project Manager</option>
            <option>Team Leader</option>
            <option>Engineer</option>
          </Form.Control>
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

        <Button variant="primary" block onClick={() => props.loginToServer("userName")}>
          Create User
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state1: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginToServer: (userDetail) => {
      dispatch(loginToServer(userDetail));
    },
    // getProfile: (profile) => {
    //   dispatch(getProfile(profile));
    // },
    // getFollowings: (followings) => {
    //   dispatch(getFollowings(followings));
    // },
    // getFollowers: (followers) => {
    //   dispatch(getFollowers(followers));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
