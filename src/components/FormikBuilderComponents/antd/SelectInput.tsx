import { Select, Typography } from "antd";
import React from "react";
import { CommonInputProps, schemaFieldSelect } from "../../FormikBuilder2/utils/typesOld";
import {RedErrorBelow} from "./BasicComponents";


export const SelectInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props
}: CommonInputProps) => {
 
  const ShowOptions = (options: { [value: string]: string }) => {
    const list = [];
    for (let [key, value] of Object.entries(options)) {
      list.push(
        <Select.Option key={key} value={key}>
          {value}
        </Select.Option>
      );
    }
    return list;
  };

  return (
    <>
      <label htmlFor={name}>
        <Typography>{props.fieldInfo.label}</Typography>
      </label>
      <Select style={{ width: "100%" }} value={value} >
        {ShowOptions((props.fieldInfo as schemaFieldSelect).options)}
      </Select>
      <RedErrorBelow meta={meta} />
    </>
  );
};


