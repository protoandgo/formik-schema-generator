import { Input } from 'antd';
import React from 'react';
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from './BasicComponents';
const { TextArea } = Input;


export const TextAreaInput = ({
  fieldInfo, // label, options, rows, etc
  inputProps, // formik's FieldInputProps (name, value, checked, onBlur) and disabled
  meta, // touched, error
  setFieldValue, // to use on handleChange
}: componentCommonProps) => {

  const customHandle = (e: { target: { value: any } }) => {
    setFieldValue(inputProps.name, e.target.value);
  };
  return (
    <React.Fragment>
      <FieldLabel {...fieldInfo} />
      <TextArea
        {...inputProps}
        onChange={customHandle}
      />
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};

export default TextAreaInput;