import { Typography } from "antd";
import { FieldMetaProps } from "formik";
import React from "react";

type RedErrorBelowProps = {
  meta: FieldMetaProps<any>
}
const RedErrorBelow = (props: RedErrorBelowProps) => {
  const { meta } = props;
  return meta.touched && meta.error ? <Typography.Text type="danger">{meta.error}</Typography.Text> : <React.Fragment></React.Fragment>;
};

export default RedErrorBelow;
