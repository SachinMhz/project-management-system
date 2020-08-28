import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { getUsersEnrolledOnProject } from "../actions/userAction";
import { assignUserToTask, clearTaskError } from "../actions/taskAction";

const AssignUserToTask = (props) => {
  const { current_task } = props;
  const [user_id, setUser_id] = useState("");

  const userList = props.users.users;
  const project_id = props.project_id;

  useEffect(() => {
    props.getUsersEnrolledOnProject(current_task.project_id);
    props.clearTaskError();
  }, []);

  return (
    <div className="container--center">
      <h1>Assign User To Task</h1>
      <Form>
        <Form.Group>
          <Form.Label>Assign User</Form.Label>
          <Form.Control
            as="select"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          >
            <option value={""}>Select Assignee</option>
            {userList.map((user, index) => {
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
            props.assignUserToTask(user_id, current_task.task_id);
          }}
        >
          Update Task
        </Button>
        <br />
        {props.task.error && (
          <Alert variant="danger">Error: {props.task.error}</Alert>
        )}
        {props.task.success && (
          <Alert variant="success">Success: {props.task.success}</Alert>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    project: state.project,
    task: state.task,
  };
};

export default connect(mapStateToProps, {
  getUsersEnrolledOnProject,
  assignUserToTask,
  clearTaskError,
})(AssignUserToTask);
