import React from "react";
import moment from "moment";

//MUI
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateAdapter from '@mui/lab/AdapterMoment'  //if we use Luxon we will have to do 'yarn add @date-io/luxon' and "import DateAdapter from '@mui/lab/AdapterLuxon'";
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TextField from '@mui/material/TextField'

//FORMIK
import { componentCommonProps } from "../../FormikBuilder/utils/types";
import { FieldLabel, RedErrorBelow } from "./BasicComponents";

export const DateInput = ({
  fieldInfo, // label, options, rows, etc
  inputProps, // formik's FieldInputProps (name, value, checked, onBlur) and disabled
  meta, // touched, error
  setFieldValue, // to use on handleChange
}: componentCommonProps) => {
  const customHandle = (dateObj: moment.Moment | null) => {
    console.log(dateObj);
    setFieldValue(fieldInfo.id, dateObj);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DesktopDatePicker
          label={<FieldLabel {...fieldInfo} />}
          inputFormat="MM/dd/yyyy"
          {...inputProps}
          onChange={customHandle}
          renderInput={(params) => <TextField {...params} />}
        />
        <RedErrorBelow meta={meta} />
      </LocalizationProvider>
    </>
  );
};


