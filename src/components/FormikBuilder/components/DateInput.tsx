import { DatePicker } from "antd";
import { useFormikContext } from "formik";
import moment from "moment";
import React from "react";
import RedErrorBelow from "./RedErrorBelow";

type DateInputProps = {
    [x: string]: any;
    name: string;
}


const DateInput = (props: DateInputProps) => {
    // const [field/*, meta*/] = useField({ ...props, type: 'date' })
    const { field, meta } = props;
    const { setFieldValue } = useFormikContext();

    return (<React.Fragment>
      <DatePicker
        {...field}
        // {...props}
        value={(field.value && moment(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
      <RedErrorBelow meta={meta} /></React.Fragment>
    );
}

export default DateInput