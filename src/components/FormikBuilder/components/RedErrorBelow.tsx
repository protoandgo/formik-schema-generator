import { Typography } from "antd";
import { FieldMetaProps } from "formik";
import React from "react";

type RedErrorBelowProps = {
  meta: FieldMetaProps<any>
}
const RedErrorBelow = (props: RedErrorBelowProps) => {
  const { meta } = props;
  return <Typography.Text type="danger">{meta.touched && meta.error ? meta.error : ""}</Typography.Text>;
};

export default RedErrorBelow;
