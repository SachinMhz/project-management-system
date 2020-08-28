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
        <Card.Body>
          <Card.Title>Task : {title}</Card.Title>
          <Card.Text>Task Assigned To - {display_name}</Card.Text>
          <Card.Text>Description:{description}</Card.Text>
          {(user_id === current_user_id || role === "admin") && (
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

          {role === "admin" && <Button variant="danger">Delete Task</Button>}
        </Card.Body>
      </Card>
    </div>
  );
};
export default TaskComponent;
