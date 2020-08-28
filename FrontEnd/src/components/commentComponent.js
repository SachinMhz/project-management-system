import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import DeleteComponent from "./deleteComponent";
import { connect } from "react-redux";
import { deleteComment } from "../actions/commentAction";
import UpdateComment from "../components/updateComment";

const CommentComponent = (props) => {
  const { comment, commenter_name, commenter_id, comment_id } = props.comment;
  const current_user_id = Number(window.localStorage.getItem("user_id"));

  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);

  const handleUpdateModalClose = () => setUpdateModal(false);
  const handleUpdateModalShow = () => setUpdateModal(true);
  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <Card className="text-center">
        <Card.Header>Commented By - {commenter_name}</Card.Header>
        <Card.Body>
          <Card.Text>{comment}</Card.Text>

          {commenter_id === current_user_id && (
            <>
              <Button variant="info" onClick={handleUpdateModalShow}>
                Update
              </Button>
              <Button variant="danger" onClick={handleModalShow}>
                Delete
              </Button>
            </>
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
      <Modal show={updateModal} onHide={handleUpdateModalClose}>
        <UpdateComment current_comment={props.comment} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { deleteComment })(CommentComponent);
