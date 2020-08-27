import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const TaskComponent = (props) => {
  const { title, description, display_name, user_id, task_id } = props.task;
  const role = window.localStorage.getItem("role");
  const current_user_id = Number(window.localStorage.getItem("user_id"));

  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <Card className="text-center">
        <Card.Header>
          <Card.Title>{title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          {(user_id === current_user_id || role === "admin") && (
            <>
              <Link
                to={{
                  pathname: "/task/" + task_id,
                  state: { task_id },
                }}
              >
                <Button variant="primary" block>
                  Show Task
                </Button>
              </Link>
              {/* <Button variant="info" block>
                Update
              </Button> */}
            </>
          )}

          {role === "admin" && (
            <Button variant="danger" block>
              Delete Task
            </Button>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          Task Assigned To - {display_name}
        </Card.Footer>
      </Card>
    </div>
  );
};
export default TaskComponent;
