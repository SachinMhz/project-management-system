import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { getUsersEnrolledOnProject } from "../actions/userAction";
import { updateTask, clearTaskError } from "../actions/taskAction";

const UpdateTask = (props) => {
  const { current_task } = props;
  const [title, setTitle] = useState(current_task.title);
  const [description, setDescription] = useState(current_task.description);
  //   const [deadline, setDeadline] = useState(current_task.deadline);
  const [user_id, setUser_id] = useState(current_task.user_id);
  const [previous_user_id, setPreviousUser_id] = useState(
    current_task.previous_user_id
  );
  const userList = props.users.users;
  const project_id = props.project_id;

  useEffect(() => {
    props.getUsersEnrolledOnProject(current_task.project_id);
    props.clearTaskError();
  }, []);

  return (
    <div className="container--center">
      <h1>Update Task</h1>
      <Form>
        <Form.Group>
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group>
          <Form.Label>Assign Previous User</Form.Label>
          <Form.Control
            as="select"
            value={previous_user_id}
            onChange={(e) => setPreviousUser_id(e.target.value)}
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
        {/* <Form.Group>
          <Form.Label>Deadline: </Form.Label>
          <div>
            <DatePicker value={deadline} onChange={setDeadline} />
          </div>
        </Form.Group> */}
        <Button
          variant="primary"
          block
          onClick={() => {
            props.updateTask(
              title,
              description,
              project_id,
              user_id,
              previous_user_id,
              current_task.task_id
            );
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
  updateTask,
  clearTaskError,
})(UpdateTask);
