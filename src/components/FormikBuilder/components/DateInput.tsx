import { DatePicker, Typography } from "antd";
import { useField } from "formik";

type DateInputProps = {
    [x: string]: any;
    name: string;
}


const DateInput = (props: DateInputProps) => {
    const [field, meta] = useField({ ...props, type: 'datePicker' })
    
    return (
        <>
            <label {...field} {...props} type='date'>
                {props.children}
            </label>
            <label>
                {meta.touched && meta.error
                    ? <Typography style={{ color: 'darkred' }}>{meta.error}</Typography>
                    : null}
                <br />
            </label>
            </>
    )
}

export default DateInput