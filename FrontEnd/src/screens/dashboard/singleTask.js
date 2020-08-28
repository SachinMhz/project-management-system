import { Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

import { getTaskInfo } from "../../actions/taskAction";
import { getAllCommentsFromTask } from "../../actions/commentAction";
import AddUserToProject from "../../components/addUserToProject";
import AddComment from "../../components/addComment";
import UpdateTask from "../../components/updateTask";
import AddTag from "../../components/addTag";
import CommentComponent from "../../components/commentComponent";

const SingleTaskScreen = (props) => {
  const { state } = useLocation();
  const role = window.localStorage.getItem("role");
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [addTagModal, setAddTagModal] = useState(false);

  const closeAddUserModal = () => setAddUserModal(false);
  const showAddUserModal = () => setAddUserModal(true);

  const closeUpdateModal = () => setUpdateModal(false);
  const showUpdateModal = () => setUpdateModal(true);

  const closeDeleteModal = () => setDeleteModal(false);
  const showDeleteModal = () => setDeleteModal(true);

  const closeAddTaskModal = () => setAddTaskModal(false);
  const showAddTaskModal = () => setAddTaskModal(true);

  const closeAddTagModal = () => setAddTagModal(false);
  const showAddTagModal = () => setAddTagModal(true);

  useEffect(() => {
    props.getTaskInfo(state.task_id);
    props.getAllCommentsFromTask(state.task_id);
  }, []);
  const { current_task } = props.task;
  
  if (!window.localStorage.getItem("token")) return <Redirect to="/login" />;
  return (
    <div className="container--center">
      <h3>Task Title: {current_task.title}</h3>

      <div> Task description: {current_task.description}</div>
      <br />
      {(role === "admin" || "Project_Manager") && (
        <>
          <Button variant="primary" onClick={showUpdateModal} >
            Update Task
          </Button>
          <Button variant="primary" onClick={showAddUserModal} >
            Assign User
          </Button>
          <Button variant="info" onClick={showAddTagModal} >
            Add Tag
          </Button>
          <Button variant="success" onClick={showAddTaskModal} block>
            Add Comment
          </Button>
        </>
      )}
      <Modal show={updateModal} onHide={closeUpdateModal}>
        <UpdateTask current_task={current_task} />
      </Modal>
      <Modal show={addTagModal} onHide={closeAddTagModal}>
        <AddTag
          task_id={current_task.task_id}
          project_id={current_task.project_id}
        />
      </Modal>
      <Modal show={deleteModal} onHide={closeDeleteModal}>
        <AddComment />
      </Modal>
      <Modal show={addUserModal} onHide={closeAddUserModal}>
        <AddUserToProject task={current_task.task} />
      </Modal>
      <Modal show={addTaskModal} onHide={closeAddTaskModal}>
        <AddComment task_id={current_task.task_id} />
      </Modal>
      {props.comment.comments &&
        props.comment.comments.map((comment, index) => {
          return <CommentComponent key={index} comment={comment} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    task: state.task,
    comment: state.comment,
  };
};

export default connect(mapStateToProps, {
  getTaskInfo,
  getAllCommentsFromTask,
})(SingleTaskScreen);
