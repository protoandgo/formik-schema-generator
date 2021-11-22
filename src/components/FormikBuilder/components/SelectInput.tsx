import { Select, Typography } from "antd";
import { useField } from "formik";
import { Option } from "../types"

const option: Option = {
  title: "",

  value: "",
};

type SelectInputProps = {
  [x: string]: any;
  name: string;
  label: string;
  option: Option[];
};


const SelectInput = (props: SelectInputProps) => {
  const [field, meta, label] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>
        <Typography>{label}</Typography>
      </label>
      <Select style={{ width: "100%" }} {...field} {...props}>
        {props.option.map((x) => (
          <Select.Option key={x.value} value={x.value}>
            {x.title}
          </Select.Option>
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <Typography style={{ color: "darkred" }}>{meta.error}</Typography>
      ) : null}
      <br />
    </>
  );
};

export default SelectInput;
