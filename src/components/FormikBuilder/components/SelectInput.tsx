import { Select, Typography } from "antd";
import { FieldInputProps, FieldMetaProps, useField } from "formik";
import React from "react";
import { FB_Field_Select_Option } from "../utils/types"

const option: FB_Field_Select_Option = {
  title: "",

  value: "",
};

type SelectInputProps = {
  [x: string]: any;
  name: string;
  label?: string;
  options: FB_Field_Select_Option[];
  // field: FieldInputProps<any>;
  // meta: FieldMetaProps<any>;
};


const SelectInput = (props: SelectInputProps) => {
  // const [field, meta, label] = useField(props);
  const { field, meta } = props;
  const { id, name, label, options } = props;
  return (
    <React.Fragment>
      <label htmlFor={id || name}>
        <Typography>{label}</Typography>
      </label>
      <Select style={{ width: "100%" }} {...field}>
        {options.map((x) => (
          <Select.Option key={x.value} value={x.value}>
            {x.title}
          </Select.Option>
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <Typography style={{ color: "darkred" }}>{meta.error}</Typography>
      ) : null}
      <br />
    </React.Fragment>
  );
};

export default SelectInput;
