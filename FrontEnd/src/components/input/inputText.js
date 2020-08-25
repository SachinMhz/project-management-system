import React from "react";

export const FormInput = (props) => {
  const { value, label, type, onChange } = props;
  return (
    <div>
      <span>{label}</span>
      <input value={value} type={type} onChange={onChange} />
    </div>
  );
};
