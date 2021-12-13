import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Space, Card, Button, Typography } from "antd";
import { ArrayInputProps, FormTitleProps, RedErrorBelowProps, SubmitButtonProps } from "../../FormikBuilder/utils/types";

// These are components that are used directly in FormikBuilder index and/or in the other components

/**
 * ArrayInput to show an array of fields with (+) and (-) buttons to add and remove entries
 * @param param0 fieldInfo arrayFields (JSX Elements) to show inside
 * @returns 
 */
export const ArrayInput = ({
  arrayFields,
  onAdd,
  onRemove,
  fieldInfo,
}: ArrayInputProps) => {
  return (
    <Space direction="vertical">
      {/* Label of the array field */}
      <FieldLabel {...fieldInfo} />
      {/* Map through each element and display it inside an Antd Card, along with a remove button */}
      {arrayFields.map((jsxElement, index) => (
        <Card type="inner" key={index}>
          <Space direction="vertical">
            {jsxElement}
            <Button onClick={() => onRemove(index)}>
              <MinusSquareOutlined />
            </Button>
          </Space>
        </Card>
      ))}
      {/* Button to add a new element to the array */}
      <Button onClick={onAdd}>
        <PlusSquareOutlined />
      </Button>
    </Space>
  );
};

/**
 * RedErrorBelow to show the error of a field in red text
 * @param props meta with touched and error, from formik
 * @returns 
 */
export const RedErrorBelow = (props: RedErrorBelowProps) => {
  const { meta } = props;
  return (
    <Typography.Text type="danger">
      {meta.touched && meta.error ? meta.error : ""}
    </Typography.Text>
  );
};

/**
 * FormTitle to show the title of the form, specified on the schema
 * @param props  object with the property 'text' to specify the text of the title (TODO: add more customization?)
 * @returns 
 */
export const FormTitle = (props: FormTitleProps) => {
  return <Typography.Title>{props.text}</Typography.Title>;
};

/**
 * The form's submit button
 * @param props object with the property 'text' to specify the text of the button (TODO: add more customization?)
 * @returns 
 */
export const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button type="primary" htmlType="submit">
      {props.text}
    </Button>
  );
};

/**
 * Label used in all/most of the input components
 * @param props fieldInfo with id and label
 * @returns 
 */
export const FieldLabel = (props: { id: string, label: string }) => (
  <label htmlFor={props.id}>
    <Typography.Text>{props.label}</Typography.Text>
  </label>
)