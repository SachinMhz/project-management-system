import React, { useState } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/registerAction";

const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("Project Manager");

  const clearForm = ()=>{
    setEmail("")
    setPassword("")
    setDisplayName("")
    setRole("Project Manager")
  }
  return (
    <div className="container--center">
      <br />
      <br />
      <br />
      <Form>
        <Form.Group controlId="formBasicEmail">
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
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
            props.createNewUser(displayName, email, password, role, clearForm)
          }
        >
          Create User
        </Button>
        <br />
        {props.register.error && (
          <Alert variant="danger">{props.register.error}</Alert>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    register: state.register,
  };
};

export default connect(mapStateToProps, { createNewUser })(RegisterPage);
