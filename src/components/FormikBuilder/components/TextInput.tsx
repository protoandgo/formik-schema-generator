import { Input, Typography} from "antd";
import { useField } from "formik";
import React from "react";

type TextInputProps = {
  [x: string]: any;
  name: string;
  // onBlur: (() => void);
}
const TextInput = (props: TextInputProps) => {
  // const [field, meta] = useField(props);
  const { field, meta } = props;
  // console.log(props.name + " visible? " + props.visible);
  // if (onBlur) props.onBlur();
  const { id, name, label } = props;
  return (
    <React.Fragment>
      <label htmlFor={id || name}>{label}</label>
      <Input {...field}
      // onBlur={e => {
      //   field.onBlur(e);
      //   if (onBlur) onBlur();
      // }}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      <br />
    </React.Fragment>
  );
};

export default TextInput;
