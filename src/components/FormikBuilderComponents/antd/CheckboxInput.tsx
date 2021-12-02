import { Checkbox, Typography } from "antd";
import React from "react";
import { CommonInputProps } from "../../FormikBuilder2/utils/typesOld";
import { RedErrorBelow } from "./BasicComponents";

export const CheckboxInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props
}: CommonInputProps) => {
  const customHandle = (e: { target: { checked: boolean } }) => {
    setFieldValue(name, e.target.checked);
  };
  return (
    <React.Fragment>
      <Checkbox name={name} type="checkbox" checked={value} onChange={customHandle}>
        <Typography.Text>
          <label htmlFor={name}>{props.fieldInfo.label}</label>
        </Typography.Text>
      </Checkbox>
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};
