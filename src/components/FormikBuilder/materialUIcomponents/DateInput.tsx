import { DatePicker } from "antd";
import { useFormikContext } from "formik";
import moment from "moment";
import React from "react";
import { GenericInputComponentProps } from "../utils/types";
import RedErrorBelow from "./RedErrorBelow";

const DateInput = (props: GenericInputComponentProps) => {
  const { field, meta } = props;
  const { setFieldValue } = useFormikContext();

  return (
    <React.Fragment>
      <DatePicker
        {...field}
        // {...props}
        //value={(field.value && moment(field.value)) || null}
        //onChange={(val) => {
          //setFieldValue(field.name, val);
        //}}
      />
      {/* <RedErrorBelow meta={meta} /> */}
    </React.Fragment>
  );
};

export default DateInput;
