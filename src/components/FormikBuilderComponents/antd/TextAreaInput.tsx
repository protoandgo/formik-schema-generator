import { Input, Typography } from 'antd';
import { CommonInputProps, schemaFieldTextArea } from "../../FormikBuilder2/utils/types";
import { RedErrorBelow } from './BasicComponents';
const { TextArea } = Input;


export const TextAreaInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props
}: CommonInputProps) => {
  
  const customHandle = (e: { target: { value: any } }) => {
    setFieldValue(name, e.target.value);
  };
  return (
    <>
      <label htmlFor={props.fieldInfo.name}>{props.fieldInfo.label}</label>
      <TextArea
        rows={(props.fieldInfo as schemaFieldTextArea).rows || 4}
        name={name}
        value={value}
        onChange={customHandle}
      />
      <RedErrorBelow meta={meta} />
      {/* {meta.touched && meta.error ? (
        <Typography style={{ color: "darkred" }}>{meta.error}</Typography> */}
      {/* ) : null} */}
    </>
  );
};

export default TextAreaInput;