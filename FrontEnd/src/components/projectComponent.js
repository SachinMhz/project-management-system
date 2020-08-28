import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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

  return (
    <div style={{ marginBottom: 20 }}>
      <Card className="text-center">
        <Card.Header>
          <Card.Title>{name}</Card.Title>
          Project Manager - {display_name}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {description} {user_id} {manager_id}
          </Card.Text>
          {(user_id === manager_id || role === "admin") && (
            <>
              <Link
                to={{
                  pathname: "/project/" + project_id,
                  state: { project_id },
                }}
              >
                <Button variant="primary" >
                  Show Project
                </Button>
              </Link>
              {/* <Button variant="info" >
                Update
              </Button> */}
            </>
          )}

          {role === "admin" && (
            <Button variant="danger" >
              Delete Project
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default ProjectComponent;
