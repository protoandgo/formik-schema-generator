import { InputNumber, Typography } from 'antd';
import { useField } from 'formik';
import react from 'react';

type NumberInputProps = {
    [x: string]: any;
    name: string;
    label: string;
}

const NumberInput = (props: NumberInputProps) => {
    const [field, meta, label] = useField(props);

    return (
      <>
        <label>
          <Typography>{label}</Typography>
        </label>
        <InputNumber {...field} {...props}>0</InputNumber>
        {meta.touched && meta.error ? (
          <Typography style={{ color: "darkred" }}>{meta.error}</Typography>
        ) : null}
        <br />
      </>
    );
}

