import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, Redirect } from "react-router-dom";
import DeleteComponent from "./deleteComponent";
import { connect } from "react-redux";
import { deleteProject } from "../actions/projectAction";

const ProjectComponent = (props) => {
  const {
    name,
    manager_id,
    description,
    display_name,
    project_id,
  } = props.project;
  const role = window.localStorage.getItem("role");
  const user_id = Number(window.localStorage.getItem("user_id"));
  const [modal, setModal] = useState(false);

  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card className="text-center">
        <Card.Header>
          <Card.Title>Project: {name}</Card.Title>
          Project Manager - {display_name}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {description}
          </Card.Text>
          {(user_id === manager_id ||
            role === "admin" ||
            role === "Team Leader" ||
            role === "Engineer") && (
            <>
              <Link
                to={{
                  pathname: "/project/" + project_id,
                  state: { project_id },
                }}
              >
                <Button variant="primary">Show Project</Button>
              </Link>
            </>
          )}

          {role === "admin" && (
            <Button variant="danger" onClick={handleModalShow}>
              Delete Project
            </Button>
          )}
        </Card.Body>
      </Card>
      <Modal show={modal} onHide={handleModalClose}>
        <DeleteComponent
          value="Project"
          onYesClicked={() => {
            props.deleteProject(project_id);
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

export default connect(mapStateToProps, { deleteProject })(ProjectComponent);
