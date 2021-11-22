import { DatePicker, Input, Typography } from "antd";
import { useField, useFormikContext } from "formik";

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
        value={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    );
}

export default DateInput