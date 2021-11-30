import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Space, Card, Button, Typography } from "antd";
import { ArrayInputProps, FormTitleProps, RedErrorBelowProps, SubmitButtonProps } from "../../utils/types";

export const ArrayInput = ({
  arrayElements: arrayFields,
  onAdd,
  remove: onRemove,
  x,
}: ArrayInputProps) => {
  return (
    <Space direction="vertical">
      <label htmlFor={x.name}>{x.label}</label>
      {arrayFields.map((xx, ii) => (
        <Card type="inner" key={ii}>
          <Space direction="vertical">
            {xx}
            <Button onClick={() => onRemove(ii)}>
              <MinusSquareOutlined />
            </Button>
          </Space>
        </Card>
      ))}
      <Button onClick={onAdd}>
        <PlusSquareOutlined />
      </Button>
    </Space>
  );
};

export const RedErrorBelow = (props: RedErrorBelowProps) => {
  const { meta } = props;
  return (
    <Typography.Text type="danger">
      {meta.touched && meta.error ? meta.error : ""}
    </Typography.Text>
  );
};

export const FormTitle = (props: FormTitleProps) => {
  return <Typography.Title>{props.text}</Typography.Title>;
};

export const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button type="primary" htmlType="submit">
      {props.text}
    </Button>
  );
};
