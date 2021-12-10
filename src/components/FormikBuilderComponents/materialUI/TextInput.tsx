import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import React from "react";
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from "./BasicComponents";

export const TextInput = ({
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
          <Box>
              <TextField {...inputProps} type="text" label={<FieldLabel {...fieldInfo}/>} onChange={customHandle} />
          </Box>
      
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};
