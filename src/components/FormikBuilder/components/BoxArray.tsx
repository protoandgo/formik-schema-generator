import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import { Button, Card, message, Space, Typography } from "antd";
import { FieldAttributes } from "formik";
import { Field } from "rc-field-form";
import React from "react";
import { FieldSchema, GenericInputComponentProps } from "../utils/types";
import { componentByType } from "./FieldWrapper";
import RedErrorBelow from "./RedErrorBelow";

interface BoxArrayProps extends GenericInputComponentProps {
  fields: FieldSchema[];
  allowAdd?: boolean; // default true
}

const BoxArray = (props: BoxArrayProps) => {
  const { field, meta } = props;
  const { label, fields } = props;

  const handleAdd = () => {
    message.info("Add new element");
  };

  return (
    <React.Fragment>
      <Card>
        {label && <Typography.Title level={3}>{label}</Typography.Title>}
        <Space direction="vertical" size={15} style={{ width: "100%" }}>
          {fields.map((fieldParams) => (
            <Field name={fieldParams.name}>{(props: FieldAttributes<any>) => componentByType(props, fieldParams)}</Field>
          ))}
          <Button onClick={handleAdd}>
            <PlusCircleOutlined />
          </Button>
        </Space>
      </Card>
      <RedErrorBelow meta={meta} />
    </React.Fragment>
  );
};

export default BoxArray;
