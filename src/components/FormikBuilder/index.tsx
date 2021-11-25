// Formik:
import { Form, Formik, FormikProps } from "formik";

// FormikBuilder:
import { FormSchema } from "./utils/types";

// Other:
import createYupSchema from "./utils/YupSchemaBuilder";
import FieldWrapper from "./utils/FieldWrapper";
import { Button } from "antd";

// Functional Component Props
type FormikBuilderProps = {
  formSchema: FormSchema;
  initialValues?: {};
  onSubmit: (values: any) => void;
};

// Functional Component
const FormikBuilder = (props: FormikBuilderProps) => {
  // Destructuring Props
  const { formSchema, initialValues, onSubmit } = props;

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
    // TODO something?
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues || {}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
      {(props: FormikProps<any>) => (
        <Form>
          {formSchema.fields.map((fieldParams) => (
            <FieldWrapper
              key={fieldParams.name}
              formikContext={props}
              fieldParams={fieldParams} />
          ))}
          <Button htmlType='submit'>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikBuilder;
