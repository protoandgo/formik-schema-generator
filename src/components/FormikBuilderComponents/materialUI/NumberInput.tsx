import { TextField } from '@mui/material';
import { InputProps } from 'antd';
import React, { FormEventHandler } from 'react';
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from "./BasicComponents";



export const NumberInput = ({
  fieldInfo, // label, options, rows, etc
  inputProps, // formik's FieldInputProps (name, value, checked, onBlur) and disabled
  meta, // touched, error
  setFieldValue, // to use on handleChange
}: componentCommonProps) => {

  const customHandle = (e: any) => {
    console.log(e);
    e.target.value = Math.max(0, parseInt(e.target.value));
    setFieldValue(inputProps.name, e);
  };;
  
  return (
    <React.Fragment>
      <FieldLabel {...fieldInfo} />
      <TextField
        required
        type="number"
        id="required"
        label="Required"
        defaultValue= {0}
        onInput={customHandle}
      />
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};

