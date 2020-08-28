import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/loginAction";
import { getUserInfo } from "../../actions/userAction";
import { getAllProject,getProjectEnrolledByUser } from "../../actions/projectAction";
import { Redirect } from "react-router-dom";
import AddProject from "./addProject";
import ProjectComponent from "../../components/projectComponent";

const ProjectsScreen = (props) => {
  // console.log("props.user >>", props.users);
  const role = window.localStorage.getItem("role");
  const [modal, setModal] = useState(false);

  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);

  useEffect(() => {
    let role = window.localStorage.getItem("role");
    let user_id = window.localStorage.getItem("user_id");
    if(role ==="admin" || role==="Project Manager")
      props.getAllProject();
    else
    props.getProjectEnrolledByUser(user_id)
  }, []);

  if (!window.localStorage.getItem("token")) return <Redirect to="/login" />;
  return (
    <div className="container--center">
      <h1>Projects</h1>
      {role === "admin" && (
        <>
          <br />
          <Button variant="primary" onClick={handleModalShow} block>
            Add Project
          </Button>
          <br />
        </>
      )}
      <Modal show={modal} onHide={handleModalClose}>
        <AddProject />
      </Modal>
      {props.project.projects.length > 0 &&
        props.project.projects.map((project, index) => {
          return <ProjectComponent key={index} project={project} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    project: state.project,
  };
};

export default connect(mapStateToProps, {
  logOutUser,
  getUserInfo,
  getAllProject,getProjectEnrolledByUser
})(ProjectsScreen);
