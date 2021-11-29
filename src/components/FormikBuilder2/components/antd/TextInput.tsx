import { Input } from "antd";
import { FieldAttributes, FieldMetaProps } from "formik";
import React from "react";
import { schemaField } from "../../utils/types";
import { RedErrorBelow } from "./BasicComponents";

export const TextInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props }:
  {
    field: FieldAttributes<any>;
    meta: FieldMetaProps<any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    fieldInfo: schemaField
  }) => {
  const customHandle = (e: { target: { value: any; }; }) => {
    // console.log(e.target.value);
    setFieldValue(name, e.target.value);
  }
  // console.log(name);
  return <React.Fragment>

    <label
      htmlFor={props.fieldInfo.name}>
      {props.fieldInfo.label}
    </label>
    <Input name={name} type="text" value={value} onChange={customHandle} />
    <RedErrorBelow meta={meta} />
  </React.Fragment>
}
