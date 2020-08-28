import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const DeleteComponent = (props) => {
  return (
    <div className="container--center" style={{ padding: 20 }}>
      <h1>Delete {props.value}</h1>
      <h6>Are you sure you want to delete {props.value} ?</h6>
      <Button variant="danger" onClick={props.onYesClicked}>
        Delete
      </Button>
      <Button variant="info" onClick={props.onNoClicked}>
        Cancel
      </Button>
    </div>
  );
};

export default DeleteComponent;
