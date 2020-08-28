import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { getUsersEnrolledOnProject } from "../actions/userAction";
import {
  addComment,
  clearCommentError,
  updateComment,
} from "../actions/commentAction";

const UpdateComment = (props) => {
  const { current_comment } = props;
  const [comment, setComment] = useState(current_comment.comment);
  const task_id = props.task_id;

  useEffect(() => {
    props.clearCommentError();
  }, []);

  return (
    <div className="container--center">
      <h1>Update Comment</h1>
      <Form>
        <Form.Group>
          <Form.Label>Update Comment</Form.Label>
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
            props.updateComment(
              comment,
              current_comment.comment_id,
              current_comment.task_id
            );
          }}
        >
          Update Comment
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
    comment: state.comment,
  };
};

export default connect(mapStateToProps, {
  clearCommentError,
  updateComment,
})(UpdateComment);
