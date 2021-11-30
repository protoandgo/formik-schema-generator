import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Space, Card, Button, Typography } from "antd";
import { FieldMetaProps } from "formik";
import { schemaFieldArray } from "../../utils/types";

export const ArrayInput = (
  arrayFields: JSX.Element[],
  onAdd: () => void,
  onRemove: (index: number) => void,
  x: schemaFieldArray,
) => {
  return (<Space direction="vertical">
    <label
      htmlFor={x.name}>
      {x.label}
    </label>
    {arrayFields.map((xx, ii) =>
      <Card type="inner" key={ii}>
        <Space direction="vertical">
          {xx}
          <Button onClick={() => onRemove(ii)}>
            <MinusSquareOutlined />
          </Button>
        </Space>
      </Card>
    )}
    <Button onClick={onAdd}>
      <PlusSquareOutlined />
    </Button>
  </Space>)
}

export const RedErrorBelow = (props: { meta: FieldMetaProps<any> }) => {
  const { meta } = props;
  return <Typography.Text type="danger">{meta.touched && meta.error ? meta.error : ""}</Typography.Text>;
};

export const FormTitle = (props: { text: string }) => {
  return <Typography.Title>{props.text}</Typography.Title>
}

export const SubmitButton = (props: { text: string }) => {
  return <Button type="primary" htmlType="submit">{props.text}</Button>
}