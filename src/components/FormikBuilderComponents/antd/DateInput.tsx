import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
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
    <React.Fragment>
      <FieldLabel {...fieldInfo} />
      <DatePicker
        {...inputProps}
        onChange={customHandle}
      />
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};


