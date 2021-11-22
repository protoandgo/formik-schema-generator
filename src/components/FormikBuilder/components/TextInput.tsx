import { Input, Typography} from "antd";
import { useField } from "formik";

type TextInputProps = {
  [x: string]: any;
  name: string;
  onBlur: (() => void);
  visible: boolean;
}
const TextInput = (props: TextInputProps) => {
  const [field, meta] = useField(props);
  // console.log(props.name + " visible? " + props.visible);
  if (props.onBlur) props.onBlur();
  return (
    <div hidden={props.visible!= null && !props.visible}>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <Input {...field} onBlur={e => {
        field.onBlur(e);
        if (props.onBlur) props.onBlur();
      }} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      <br />
    </div>
  );
};

export default TextInput;
