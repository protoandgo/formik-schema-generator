import { Select, Typography } from "antd";
import { useField } from "formik";

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Typography htmlFor={props.id || props.name}>{label}</Typography>
      <Select style={{ width: '100%' }} {...field} {...props}>
        {props.options.map((x) => (
          <Select.Option key={x.value} value={x.value}>{x.title}</Select.Option>
        ))}
      </Select>
      {meta.touched && meta.error ? <Typography>{meta.error}</Typography> : null /*TODO texto rojo para el error*/}
      <br />
    </>
  );
};

export default SelectInput;
