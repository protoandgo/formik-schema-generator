import { Checkbox } from "antd";
import React from "react";
import { GenericInputComponentProps } from "../utils/types";
import RedErrorBelow from "./RedErrorBelow";

const CheckboxInput = (props: GenericInputComponentProps) => {
  const { field, meta } = props;
  const { label } = props;

  return (
    <React.Fragment>
      <Checkbox {...field}>{label}</Checkbox>
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};

export default CheckboxInput;
