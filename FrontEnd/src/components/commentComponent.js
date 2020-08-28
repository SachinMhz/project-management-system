import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CommentComponent = (props) => {
  const { comment, commenter_name, commenter_id } = props.comment;
  const current_user_id = Number(window.localStorage.getItem("user_id"));

  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <Card className="text-center">
        <Card.Header>Commented By - {commenter_name}</Card.Header>
        <Card.Body>
          <Card.Text>{comment}</Card.Text>

          {commenter_id === current_user_id && (
            <Button variant="danger" >
              Delete Comment
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default CommentComponent;
