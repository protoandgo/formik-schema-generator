// Formik:
import { Form, Formik, FormikProps } from "formik";

// FormikBuilder:
import { FormSchema } from "./utils/types";

// Other:
import createYupSchema from "./utils/YupSchemaBuilder";
import FieldWrapper from "./components/FieldWrapper";
import { Button, Space, Typography } from "antd";
import React from "react";

// Functional Component Props
type FormikBuilderProps = {
  title?: string;
  formSchema: FormSchema;
  initialValues?: {};
  onSubmit: (values: any) => void;
};

// Functional Component
const FormikBuilder = (props: FormikBuilderProps) => {
  // Destructuring Props
  const { title, formSchema, initialValues, onSubmit } = props;

  // Map through each field to give default values to the initialValues that are undefined
  const initialValuesEmpty: any = {};
  formSchema.fields.forEach((field) => {
    if (["text", "email", "password", "phone", "textarea"].includes(field.type)) initialValuesEmpty[field.name] = "";
    else
      switch (field.type) {
        case "number":
          initialValuesEmpty[field.name] = 0;
          break;
        case "checkbox":
          initialValuesEmpty[field.name] = false;
          break;
        // case "date":
        //   initialValuesEmpty[field.name] = moment().toISOString();
        //   break;
        case "select":
          initialValuesEmpty[field.name] = field.options[0];
          break;
      }
  });
  Object.assign(initialValuesEmpty, initialValues);

  // Map through each field to build a Yup validation schema
  const validationSchema = createYupSchema(formSchema.fields);

  // Handle Submit
  const handleSubmit = (values: any) => {
    // Mark all fields as 'touched' before submit so that all errors are shown

    // Call the given onSubmit function
    onSubmit(values);
  };

  return (
    <React.Fragment>
      {title && <Typography.Title>{title}</Typography.Title>}
      <Formik initialValues={initialValues || {}} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(props: FormikProps<any>) => (
          <Form>
            <Space direction="vertical" size={15} style={{ width: "100%" }}>
              {formSchema.fields.map((fieldParams) => (
                <FieldWrapper key={fieldParams.name} formikContext={props} fieldParams={fieldParams} />
              ))}
              <Button htmlType="submit">Submit</Button>
            </Space>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default FormikBuilder;
