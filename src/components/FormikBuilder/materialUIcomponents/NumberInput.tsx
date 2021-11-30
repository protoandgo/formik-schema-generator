import { InputNumber, Typography } from 'antd';
import { useField } from 'formik';
import RedErrorBelow from './RedErrorBelow';

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
        <RedErrorBelow meta={meta} />
      </>
    );
}

export default NumberInput;