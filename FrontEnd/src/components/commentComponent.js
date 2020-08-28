import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import DeleteComponent from "./deleteComponent";
import { connect } from "react-redux";
import { deleteComment } from "../actions/commentAction";

const CommentComponent = (props) => {
  const { comment, commenter_name, commenter_id, comment_id } = props.comment;
  const current_user_id = Number(window.localStorage.getItem("user_id"));

  const [modal, setModal] = useState(false);

  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);
  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <Card className="text-center">
        <Card.Header>Commented By - {commenter_name}</Card.Header>
        <Card.Body>
          <Card.Text>{comment}</Card.Text>

          {commenter_id === current_user_id && (
            <Button variant="danger" onClick={handleModalShow}>
              Delete Comment
            </Button>
          )}
        </Card.Body>
      </Card>

      <Modal show={modal} onHide={handleModalClose}>
        <DeleteComponent
          value="Comment"
          onYesClicked={() => {
            props.deleteComment(comment_id, current_user_id);
            handleModalClose();
          }}
          onNoClicked={handleModalClose}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { deleteComment })(CommentComponent);
