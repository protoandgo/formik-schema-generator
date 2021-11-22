import { Input, Typography} from "antd";
import { useField } from "formik";

type TextInputProps = {
  [x: string]: any;
  name: string;
  label: string;
}
const TextInput = (props: TextInputProps) => {
  const [field, meta, label] = useField({...props, type: 'text'});
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
       <Input {...field} {...props} type= 'text'/>
      {meta.touched && meta.error
        ? <Typography style={{ color: "darkred" }}>{meta.error}</Typography>
        : null}
      <br />
    </>
  );
};

export default TextInput;
