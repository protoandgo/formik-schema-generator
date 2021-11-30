import { Input } from "antd";
import React from "react";
import { CommonInputProps } from "../../utils/types";
import { RedErrorBelow } from "./BasicComponents";

export const TextInput = ({
  field: { name, value },
  meta,
  setFieldValue,
  ...props
}: CommonInputProps) => {
  const customHandle = (e: { target: { value: any } }) => {

    // console.log(e.target.value);
    //https://stackoverflow.com/questions/10372862/java-string-remove-all-non-numeric-characters-but-keep-the-decimal-separator
    if (props.fieldInfo.type === "phone") e.target.value.replaceAll("[^\\d.]", "");
    setFieldValue(name, e.target.value);
  };
  // console.log(name);
  // let type = "text";
  // switch (props.fieldInfo.type) {
  //   case "phone": type = "number";
  // }
  return (
    <React.Fragment>
      <label htmlFor={props.fieldInfo.name}>{props.fieldInfo.label}</label>
      <Input name={name} type="text" value={value} onChange={customHandle} />
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};
