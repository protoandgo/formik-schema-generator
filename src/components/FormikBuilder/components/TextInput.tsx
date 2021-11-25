import { Input } from "antd";
import React from "react";
import { GenericInputComponentProps } from "../utils/types";
import RedErrorBelow from "./RedErrorBelow";

const TextInput = (props: GenericInputComponentProps) => {
  const { field, meta } = props;
  const { name, label } = props;
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <Input {...field} />
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};

export default TextInput;
