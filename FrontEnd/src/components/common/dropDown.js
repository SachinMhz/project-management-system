import React from "react";

const DropDown = (props) => {
  return (
    <span className="dropdown ">
      <span className="dropdown__title">{props.title}: </span>
      <span className="dropdown__option">All</span>
      <i className="dropdown__icon fas fa-caret-down"></i>
    </span>
  );
};
export default DropDown;
