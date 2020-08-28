import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UpdateUser from "./updateUser";
import DeleteComponent from "./deleteComponent";
import { deleteUser } from "../actions/userAction";

const UserComponent = (props) => {
  const { display_name, role, email, user_id } = props.user;
  const [modal, setModal] = useState(false);
  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);

  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteModalClose = () => setDeleteModal(false);
  const handleDeleteModalShow = () => setDeleteModal(true);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>User - {display_name}</Card.Title>
          <Card.Text>Role - {role}</Card.Text>
          <Card.Text>Email - {email}</Card.Text>
          {window.localStorage.getItem("role") === "admin" && (
            <>
              <Button variant="info" onClick={handleModalShow}>
                Update
              </Button>
              <Button variant="danger" onClick={handleDeleteModalShow}>
                Delete User
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      <Modal show={modal} onHide={handleModalClose}>
        <UpdateUser user={props.user} />
      </Modal>
      <Modal show={deleteModal} onHide={handleDeleteModalClose}>
        <DeleteComponent
          value="User"
          onYesClicked={() => {
            props.deleteUser(user_id);
            handleDeleteModalClose();
          }}
          onNoClicked={handleDeleteModalClose}
        />
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { deleteUser })(UserComponent);
