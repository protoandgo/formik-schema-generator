import { InputNumber, Typography } from 'antd';
import { CommonInputProps } from "../../FormikBuilder2/utils/typesOld";
import {RedErrorBelow} from "./BasicComponents";



export const NumberInput = ({
  field: { name, onChange, value },
  meta,
  setFieldValue,
  ...props
}: CommonInputProps) => {
  
  const customHandle = (e: number) => {
    console.log(e);
    setFieldValue(name, e);
  };

  return (
    <>
      <Typography>
        <label htmlFor={props.fieldInfo.name}>{props.fieldInfo.label}</label>
      </Typography>
      
      <InputNumber name={name} type="number" value={value} onChange={customHandle} />

      <RedErrorBelow meta={meta} />
    </>
  );
};

