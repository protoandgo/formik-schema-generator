import TextareaAutosize from '@mui/material/TextareaAutosize';
import React from 'react';
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from './BasicComponents';



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
      <TextareaAutosize
        {...inputProps}
        onChange={customHandle}
        minRows={3}
      />
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};

export default TextAreaInput;