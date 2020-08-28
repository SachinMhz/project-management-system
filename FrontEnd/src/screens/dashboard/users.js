import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/userAction";
import { Redirect } from "react-router-dom";
import AddProject from "../auth/register";
import UserComponent from "../../components/userComponent";

const UserScreen = (props) => {
  // console.log("props.user >>", props.users);
  const role = window.localStorage.getItem("role");
  const [modal, setModal] = useState(false);

  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);
  // console.log("usrse", props.users.users);
  useEffect(() => {
    props.getAllUsers();
  }, []);

  if (window.localStorage.getItem("role") !== "admin") {
    return <Redirect to="/login" />;
  }

  if (!window.localStorage.getItem("token")) return <Redirect to="/login" />;
  return (
    <div className="container--center">
      <h1>Users</h1>
      {role === "admin" && (
        <>
          <br />
          <Button variant="primary" onClick={handleModalShow} block>
            Add User
          </Button>
          <br />
        </>
      )}
      <Modal show={modal} onHide={handleModalClose}>
        <AddProject />
      </Modal>
      {props.users.users &&
        props.users.users.map((user, index) => {
          return <UserComponent key={index} user={user} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { getAllUsers })(UserScreen);
