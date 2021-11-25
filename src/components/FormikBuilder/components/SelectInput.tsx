import { Select, Typography } from "antd";
import { FieldInputProps, FieldMetaProps } from "formik";
import React from "react";

type SelectInputProps = {
  [x: string]: any;
  name: string;
  label?: string;
  options: { [value: string]: string };
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
};

const SelectInput = (props: SelectInputProps) => {
  // const [field, meta, label] = useField(props);
  const { field, meta } = props;
  const { id, name, label, options } = props;

  const ShowOptions = (options: { [value: string]: string }) => {
    const list = [];
    for (let [key, value] of Object.entries(options)) {
      list.push (
        <Select.Option key={key} value={key}>
          {value}
        </Select.Option>
      );
    }
    return list;
  };

  return (
    <React.Fragment>
      <label htmlFor={id || name}>
        <Typography>{label}</Typography>
      </label>
      <Select style={{ width: "100%" }} {...field}>
        {ShowOptions(options)}
      </Select>
      {meta.touched && meta.error ? <Typography style={{ color: "darkred" }}>{meta.error}</Typography> : null}
      <br />
    </React.Fragment>
  );
};

export default SelectInput;
