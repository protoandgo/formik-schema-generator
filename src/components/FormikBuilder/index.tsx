import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, Select, TextInput } from "./components";

// =========================== Types =========================== //
type FieldAny = {
  name: string;
  label: string;
  placeholder?: string;
}
interface FieldTextNumberEmailCheckbox extends FieldAny {
  type: "text" | "number" | "email" | "checkbox";
}
interface FieldSelect extends FieldAny {
  type: "select";
  options: {
    value: string;
    title: string;
  }[];
}
interface FieldDate extends FieldAny {
  type: "date";
  datePickerProps: {
    // ...;
  };
  helpText: string;
}
export type Field =
  | FieldTextNumberEmailCheckbox
  | FieldSelect
  | FieldDate;

type FormikBuilderProps = {
  fields: Field[];
  initialValues?: {};
  onSubmit: (values: {}) => void;
};

// =========================== Util =========================== //
const BuildFields = (fields: Field[]): React.ReactNode => {
  return fields.map((x) => {
    switch (x.type) {
      case "text":
        return (
          <TextInput
            key={x.name}
            label={x.label}
            name={x.name}
            type={x.type}
            placeholder={x.placeholder}
          />
        );
      case "select":
        return (
          <Select
            key={x.name}
            label={x.label}
            name={x.name}
            type={x.type}
            placeholder={x.placeholder}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            key={x.name}
            label={x.label}
            name={x.name}
            type={x.type}
            placeholder={x.placeholder}
            children={"this is a CHECKBOX"}
          />
        );
      default:
        return <></>;
    }
  });
};

// =========================== Functional Component =========================== //
const FormikBuilder = (props: FormikBuilderProps) => {
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
        onSubmit(values);
      }}
    >
      <Form>
        {BuildFields(fields)}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikBuilder;
