import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const UserComponent = (props) => {
  const { display_name, role, email, user_id } = props.user;

  return (
    <div style={{ marginBottom: 20 }}>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>User - {display_name}</Card.Title>
          <Card.Text>Role - {role}</Card.Text>
          <Card.Text>Email - {email}</Card.Text>
          {window.localStorage.getItem("role") === "admin" && (
            <>
              <Button variant="info">Update</Button>
              <Button variant="danger">Delete User</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default UserComponent;
