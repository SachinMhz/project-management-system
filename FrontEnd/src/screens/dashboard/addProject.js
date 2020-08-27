import React, { useState, useEffect } from "react";
// import { FormInput } from "../../components/input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { getUserInfo, getProjectManagers } from "../../actions/userAction";
import { addProject } from "../../actions/projectAction";

const AddProject = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [manager_id, setManager_id] = useState("");
  const projectManagers = props.users.projectManagers;

  const clearForm = () => {
    setName("");
    setDescription("");
    setManager_id("");
  };

  useEffect(() => {
    props.getProjectManagers();
  }, []);

  return (
    <div className="container--center">
      <h1>Create New Project</h1>
      <Form>
        <Form.Group>
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Manager</Form.Label>
          <Form.Control
            as="select"
            value={manager_id}
            onChange={(e) => setManager_id(e.target.value)}
          >
            <option value={""}>Select Project Manager</option>
            {projectManagers.map((user, index) => {
              return (
                <option key={index} value={user.user_id}>
                  {user.display_name} ({user.email})
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          block
          onClick={() => {
            props.addProject(name, description, manager_id, clearForm);
          }}
        >
          Create Project
        </Button>
        <br />
        {props.project.error && (
          <Alert variant="danger">{props.project.error}</Alert>
        )}
        {props.project.success && (
          <Alert variant="success">{props.project.success}</Alert>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    project: state.project,
  };
};

export default connect(mapStateToProps, {
  getUserInfo,
  getProjectManagers,
  addProject,
})(AddProject);
