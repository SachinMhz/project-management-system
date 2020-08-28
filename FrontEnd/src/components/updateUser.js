import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { updateUser, clearUserError } from "../actions/userAction";

const UpdateUser = (props) => {
  const [email, setEmail] = useState(props.user.email);
  // const [password, setPassword] = useState(props.user.password);
  const [displayName, setDisplayName] = useState(props.user.display_name);
  const [role, setRole] = useState(props.user.role);

  useEffect(() => {
    props.clearUserError();
  }, []);
  return (
    <div className="container--center">
      <br />
      <br />
      <h2>Update User</h2>
      <br />
      <Form>
        <Form.Group>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
        {/* <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Project Manager">Project Manager</option>
            <option value="Team Leader">Team Leader</option>
            <option value="Engineer">Engineer</option>
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          block
          onClick={() =>
            props.updateUser(displayName, email, role, props.user.user_id)
          }
        >
          Update User
        </Button>
        <br />
        {props.users.error && (
          <Alert variant="danger">{props.users.error}</Alert>
        )}
        {props.users.success && (
          <Alert variant="success">{props.users.success}</Alert>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { updateUser, clearUserError })(
  UpdateUser
);
