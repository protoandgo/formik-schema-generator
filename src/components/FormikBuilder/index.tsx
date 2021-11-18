import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, Select, TextInput } from "./components";

export type SelectOption = {
  value: string;
  title: string;
}
export type FieldType = "text" | "number" | "email" | "select" | "checkbox";
export type Field = {
  label: string;
  name: string;
  type: FieldType;
  description?: string;
  placeholder?: string;
  options?: SelectOption[];
};
type TestFormSchemaProps = {
  fields: Field[];
  initialValues?: {};
  onSubmit: (values: []) => void;
};

const TestFormSchema = (props: TestFormSchemaProps) => {
  const { fields, initialValues, onSubmit } = props;

  return (
    <Formik
      initialValues={initialValues || {}}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email addresss`")
          .required("Required"),
        acceptedTerms: Yup.boolean()
          .required("Required")
          .oneOf([true], "You must accept the terms and conditions."),
        jobType: Yup.string()
          .oneOf(
            ["designer", "development", "product", "other"],
            "Invalid Job Type"
          )
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        await new Promise((r) => setTimeout(r, 500));
        setSubmitting(false);
      }}
    >
      <Form>
        <>
          {fields.map((x) => {
            switch (x.type) {
              case "text":
                return (
                  <TextInput
                    key={x.label}
                    label={x.label}
                    name={x.name}
                    type={x.type}
                    placeholder={x.placeholder}
                  />
                );
              case "select":
                return (
                  <Select
                    key={x.label}
                    label={x.label}
                    name={x.name}
                    type={x.type}
                    placeholder={x.placeholder}
                  />
                );
              case "checkbox":
                return (
                  <Checkbox
                    key={x.label}
                    label={x.label}
                    name={x.name}
                    type={x.type}
                    placeholder={x.placeholder}
                    children={"this is a CHECKBOX"}
                  />
                );
            }
          })}
        </>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default TestFormSchema;
