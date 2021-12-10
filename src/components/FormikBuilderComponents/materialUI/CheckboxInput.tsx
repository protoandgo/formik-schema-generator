import  Checkbox  from '@mui/material/Checkbox'
import React from "react";
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from "./BasicComponents";

export const CheckboxInput = ({
  fieldInfo, // label, options, rows, etc
  inputProps, // formik's FieldInputProps (name, value, checked, onBlur) and disabled
  meta, // touched, error
  setFieldValue, // to use on handleChange
}: componentCommonProps) => {
  const customHandle = (e: { target: { checked: boolean } }) => {
    setFieldValue(inputProps.name, e.target.checked);
  };
  return (
    <React.Fragment>
      {/* <Checkbox {...inputProps} checked={inputProps.checked} onChange={customHandle}>
        <FieldLabel {...fieldInfo} />
      </Checkbox> */}
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};
