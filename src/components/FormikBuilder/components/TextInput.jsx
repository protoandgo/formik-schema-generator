import { Input } from "antd";
import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      <br />
    </>
  );
};

export default TextInput;
