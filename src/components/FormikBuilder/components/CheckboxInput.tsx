import { Checkbox, Typography } from "antd";
import { useField } from "formik";

export type CheckboxProps = {
  [x: string]: any;
  name: string;
  label: string;
}
const CheckboxInput = (props: CheckboxProps) => {
  const [field, meta, label] = useField({...props, type: 'checkbox' });
  return (
    <>
        <Checkbox {...field} {...props} type="checkbox" >{label}</Checkbox>
      {meta.touched && meta.error
        ? <Typography style={{ color: 'darkred' }}>{meta.error}</Typography>
        : null}
      <br />
    </>
  );
};

export default CheckboxInput;