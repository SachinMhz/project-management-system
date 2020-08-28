import { Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

import { getAllProject, getProjectInfo } from "../../actions/projectAction";
import { getAllTaskFromProject } from "../../actions/taskAction";
import AddUserToProject from "../../components/addUserToProject";
import AddTask from "../../components/addTask";
import UpdateProject from "../../components/updateProject";
import AddProject from "./addProject";
import TaskComponent from "../../components/taskComponent";

const SingleProjectScreen = (props) => {
  const { state } = useLocation();
  const role = window.localStorage.getItem("role");
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);

  const closeAddUserModal = () => setAddUserModal(false);
  const showAddUserModal = () => setAddUserModal(true);

  const closeUpdateModal = () => setUpdateModal(false);
  const showUpdateModal = () => setUpdateModal(true);

  const closeDeleteModal = () => setDeleteModal(false);
  const showDeleteModal = () => setDeleteModal(true);

  const closeAddTaskModal = () => setAddTaskModal(false);
  const showAddTaskModal = () => setAddTaskModal(true);

  useEffect(() => {
    props.getProjectInfo(state.project_id);
    props.getAllTaskFromProject(state.project_id);
  }, []);
  const { current_project } = props.project;

  if (!window.localStorage.getItem("token")) return <Redirect to="/login" />;
  if (!current_project) return <Redirect to="/projects" />;
  return (
    <div className="container--center">
      <h3>Project Name: {current_project.name}</h3>

      <div>Project Description: {current_project.description}</div>
      <br />
      {(role === "admin" || "Project_Manager") && (
        <>
          <Button variant="primary" onClick={showUpdateModal}>
            Update Project
          </Button>
          <Button variant="info" onClick={showAddUserModal}>
            Add User
          </Button>
          <Button variant="primary" onClick={showAddTaskModal} block>
            Add Task
          </Button>
        </>
      )}
      <Modal show={updateModal} onHide={closeUpdateModal}>
        <UpdateProject current_project={current_project} />
      </Modal>
      <Modal show={deleteModal} onHide={closeDeleteModal}>
        <AddProject />
      </Modal>
      <Modal show={addUserModal} onHide={closeAddUserModal}>
        <AddUserToProject project_id={current_project.project_id} />
      </Modal>
      <Modal show={addTaskModal} onHide={closeAddTaskModal} >
        <AddTask project_id={current_project.project_id} />
      </Modal>
      {props.task.tasks &&
        props.task.tasks.map((task, index) => {
          return <TaskComponent key={index} task={task} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.project,
    task: state.task,
  };
};

export default connect(mapStateToProps, {
  getAllProject,
  getProjectInfo,
  getAllTaskFromProject,
})(SingleProjectScreen);
