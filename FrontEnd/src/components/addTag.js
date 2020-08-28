import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { getUsersEnrolledOnProject } from "../actions/userAction";
import { addTag, clearTagError } from "../actions/tagAction";

const AddTagToTask = (props) => {
  const [user_id, setUser_id] = useState("");
  const clearForm = () => {
    setUser_id("");
  };

  useEffect(() => {
    props.getUsersEnrolledOnProject(props.project_id);
    props.clearTagError();
  }, []);

  return (
    <div className="container--center">
      <h1>Tag User</h1>
      <Form>
        <Form.Group>
          <Form.Label>Tag User</Form.Label>
          <Form.Control
            as="select"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          >
            <option value={""}>Select Users</option>
            {props.users.users.map((user, index) => {
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
            props.addTag(
              props.task_id,
              user_id,
              window.localStorage.getItem("user_id"),
              clearForm
            );
          }}
        >
          Tag User
        </Button>
        <br />
        {props.tag.error && <Alert variant="danger">{props.tag.error}</Alert>}
        {props.tag.success && (
          <Alert variant="success">{props.tag.success}</Alert>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    project: state.project,
    tag: state.tag,
  };
};

export default connect(mapStateToProps, {
  getUsersEnrolledOnProject,
  clearTagError,
  addTag,
})(AddTagToTask);
