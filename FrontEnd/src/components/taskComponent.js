import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import DeleteComponent from "./deleteComponent";
import { connect } from "react-redux";
import { deleteTask } from "../actions/taskAction";

const TaskComponent = (props) => {
  const { title, description, display_name, user_id, task_id } = props.task;
  const role = window.localStorage.getItem("role");
  const current_user_id = Number(window.localStorage.getItem("user_id"));

  const [modal, setModal] = useState(false);

  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);

  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Task : {title}</Card.Title>
          <Card.Text>Task Assigned To - {display_name}</Card.Text>
          <Card.Text>Description:{description}</Card.Text>
          {(role !== "Engineer" ||
            user_id == window.localStorage.getItem("user_id")) && (
            <>
              <Link
                to={{
                  pathname: "/task/" + task_id,
                  state: { task_id },
                }}
              >
                <Button variant="primary">Show Task</Button>
              </Link>
              {/* <Button variant="info" >
                Update
              </Button> */}
            </>
          )}

          {role === "admin" && (
            <Button variant="danger" onClick={handleModalShow}>
              Delete Task
            </Button>
          )}
        </Card.Body>
      </Card>

      <Modal show={modal} onHide={handleModalClose}>
        <DeleteComponent
          value="Task"
          onYesClicked={() => {
            props.deleteTask(task_id);
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

export default connect(mapStateToProps, { deleteTask })(TaskComponent);
