import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { getEngineers, getTeamLeaders } from "../actions/userAction";
import {
  getAllProject,
  addUserToProject,
  clearProjectError,
} from "../actions/projectAction";

const AddUserToProject = (props) => {
  const project_id = props.project_id;
  const [user_id, setUser_id] = useState("");
  const users_list = [...props.users.teamLeaders, ...props.users.engineers];
  const clearForm = () => {
    setUser_id("");
  };

  useEffect(() => {
    props.getAllProject();
    props.getEngineers();
    props.getTeamLeaders();
    props.clearProjectError();
  }, []);

  return (
    <div className="container--center">
      <h1>Assign User To Project</h1>
      <Form>
        <Form.Group>
          <Form.Label>Add User To Project</Form.Label>
          <Form.Control
            as="select"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          >
            <option value={""}>Select Users</option>
            {users_list.map((user, index) => {
              return (
                <option key={index} value={user.user_id}>
                  {user.display_name} ({user.email})
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          block
          onClick={() => {
            props.addUserToProject(project_id, user_id, clearForm);
          }}
        >
          Add User
        </Button>
        <br />
        {props.project.error && (
          <Alert variant="danger">{props.project.error}</Alert>
        )}
        {props.project.success && (
          <Alert variant="success">{props.project.success}</Alert>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    project: state.project,
  };
};

export default connect(mapStateToProps, {
  getEngineers,
  getTeamLeaders,
  getAllProject,
  addUserToProject,
  clearProjectError,
})(AddUserToProject);
