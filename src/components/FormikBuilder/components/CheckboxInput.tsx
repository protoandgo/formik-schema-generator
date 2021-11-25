import { Checkbox } from "antd";
import { FieldMetaProps } from "formik";
import RedErrorBelow from "./RedErrorBelow";

export type CheckboxProps = {
  [x: string]: any;
  name: string;
  label?: string;
  meta: FieldMetaProps<any>;
}
const CheckboxInput = (props: CheckboxProps) => {
  const { field, meta } = props;
  const { label } = props;

  return (
    <>
        <Checkbox {...field} checked={field} type="checkbox" >{label}</Checkbox>
        <RedErrorBelow meta={meta} />
      <br />
    </>
  );
};

export default CheckboxInput;