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
      {!field && <span>NO FIELD</span>}
      {meta ? <RedErrorBelow meta={meta} /> : <span>NO META</span>}
    </React.Fragment>
  );
};

export default TextInput;
