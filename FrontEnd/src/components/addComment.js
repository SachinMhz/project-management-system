import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { getUsersEnrolledOnProject } from "../actions/userAction";
import { addComment, clearCommentError } from "../actions/commentAction";

const AddComment = (props) => {
  const [comment, setComment] = useState("");
  //   const userList = props.users.users;
  const task_id = props.task_id;
  const commenter_id = window.localStorage.getItem("user_id");
  const commenter_name = window.localStorage.getItem("display_name");

  const clearForm = () => {
    setComment("");
  };

  useEffect(() => {
    // props.getUsersEnrolledOnProject(props.task_id);
    props.clearCommentError();
  }, []);

  return (
    <div className="container--center">
      <h1>Add Comment</h1>
      <Form>
        <Form.Group>
          <Form.Label>Add Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Enter Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          block
          onClick={() => {
            props.addComment(
              task_id,
              commenter_id,
              commenter_name,
              comment,
              clearForm
            );
          }}
        >
          Add Comment
        </Button>
        <br />
        {props.comment.error && (
          <Alert variant="danger">Error: {props.comment.error}</Alert>
        )}
        {props.comment.success && (
          <Alert variant="success">Success: {props.comment.success}</Alert>
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
    comment: state.comment,
  };
};

export default connect(mapStateToProps, {
  getUsersEnrolledOnProject,
  addComment,
  clearCommentError,
})(AddComment);
