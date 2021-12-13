import { InputNumber } from 'antd';
import React from 'react';
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from "./BasicComponents";



export const NumberInput = ({
  fieldInfo, // label, options, rows, etc
  inputProps, // formik's FieldInputProps (name, value, checked, onBlur) and disabled
  meta, // touched, error
  setFieldValue, // to use on handleChange
}: componentCommonProps) => {

  const customHandle = (e: number) => {
    console.log(e);
    setFieldValue(inputProps.name, e);
  };

  return (
    <React.Fragment>
      <FieldLabel {...fieldInfo} disabled={inputProps.disabled} />
      <InputNumber {...inputProps} onChange={customHandle} />
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};

