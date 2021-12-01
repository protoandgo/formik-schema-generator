import { Checkbox, Typography } from "antd";
import React from "react";
import { CommonInputProps } from "../../FormikBuilder2/utils/types";
import {RedErrorBelow} from "./BasicComponents";

export const CheckboxInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props
}: CommonInputProps) => {
  const customHandle = (e: any)=>{
    setFieldValue(name, e)
  }
  return (
    <>
      <Typography>
        <label htmlFor={props.fieldInfo.name}>{props.fieldInfo.label}</label>
      </Typography>

      <Checkbox name={name} type= 'checkbox' value={value} onChange={customHandle} />
      <RedErrorBelow meta={meta} />
    </>
  );
};


