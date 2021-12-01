import { Input, Typography } from "antd";
import { commonProps } from "../../utils/types";
import { RedErrorBelow } from "./BasicComponents";

export const TextInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props
}: commonProps) => {

  const customHandle = (e: { target: { value: any } }) => {
    setFieldValue(name, e.target.value);
  };
  // console.log(name);
  return (
    <>
      <Typography>
        <label htmlFor={props.fieldInfo.name}>{props.fieldInfo.label}</label>
      </Typography>

      <Input name={name} type="text" value={value} onChange={customHandle} />

      <RedErrorBelow meta={meta} />
    </>
  );
};
