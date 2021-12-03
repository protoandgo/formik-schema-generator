import { Select } from "antd";
import React from "react";
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from "./BasicComponents";


export const SelectInput = ({
  fieldInfo, // label, options, rows, etc
  inputProps, // formik's FieldInputProps (name, value, checked, onBlur) and disabled
  meta, // touched, error
  setFieldValue, // to use on handleChange
}: componentCommonProps) => {
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

  const handleChange = (value: string) => {
    setFieldValue(inputProps.name, value);
  }

  return (
    <React.Fragment>
      <FieldLabel {...fieldInfo} />
      <Select style={{ width: "100%" }} {...inputProps} onChange={handleChange}>
        {ShowOptions(fieldInfo.options || {})}
      </Select>
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};


