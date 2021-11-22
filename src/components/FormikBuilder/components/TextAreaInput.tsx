import { Input, Typography } from 'antd';
import { useField } from 'formik'

const { TextArea } = Input;

type TextAreaProps = {
    [x: string]: any;
    name: string;
    label: string;
}

const TextAreaInput = (props: TextAreaProps) => {
    const [field, meta, label] = useField({...props, type: 'textarea'});
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <TextArea rows={4} {...field} {...props}/>
        {meta.touched && meta.error ? (
          <Typography style={{ color: "darkred" }}>{meta.error}</Typography>
        ) : null}
      </>
    );
}

export default TextAreaInput;