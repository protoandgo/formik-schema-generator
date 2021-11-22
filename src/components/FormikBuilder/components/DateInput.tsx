import { DatePicker } from "antd";
import { useField, useFormikContext } from "formik";
import moment from "moment";

type DateInputProps = {
    [x: string]: any;
    name: string;
}


const DateInput = (props: DateInputProps) => {
    const [field, meta] = useField({ ...props, type: 'date' })
    const { setFieldValue } = useFormikContext();

    return (
      <DatePicker
        {...field}
        {...props}
        value={(field.value && moment(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    );
}

export default DateInput