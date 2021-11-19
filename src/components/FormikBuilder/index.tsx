import { Form, Formik } from "formik";
import * as Yup from "yup";
import { BooleanSchema, DateSchema, NumberSchema } from "yup";
import StringSchema from "yup/lib/string";
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

// =========================== Build Initial Values by Field =========================== //
const BuildInitValues = (fields: Field[]): string | number => {
  // TODO coger datos iniciales desde el servidor cuando lo tengamos
  return "";
}

// =========================== Build Component by Field =========================== //
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

// =========================== Build Validation by Field =========================== //
type YupSchema = {
  [x: string]: BooleanSchema | StringSchema | NumberSchema | DateSchema
};
const BuildYup = (fields: Field[]) => {
  // TODO intl
  let obj: YupSchema = {};
  fields.forEach((x) => {
    switch (x.type) {
      case 'checkbox': obj[x.name] = Yup.boolean().required("Required"); break;
      case 'date': break; // TODO
      case 'email': obj[x.name] = Yup.string().email("Invalid email addresss`").required("Required"); break;
      case 'number': obj[x.name] = Yup.number().required("Required"); break;
      case 'select': obj[x.name] = Yup.string().required("Required"); break;
      case 'text': obj[x.name] = Yup.string().max(15, "Must be 15 characters or less").required("Required"); break;
    }
  });
  return  Yup.object(obj);
}

// =========================== Functional Component =========================== //

type FormikBuilderProps = {
  fields: Field[];
  initialValues?: {};
  onSubmit: (values: {}) => void;
};

const FormikBuilder = (props: FormikBuilderProps) => {
  const { fields, initialValues, onSubmit } = props;

  const handleSubmit = (values: {}) => {
    // TODO si no se ha podido enviar al servidor, mostrar ese error al usuario
    onSubmit(values);
  }

  return (
    <Formik
      initialValues={initialValues || {}}
      validationSchema={BuildYup(fields)}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        await new Promise((r) => setTimeout(r, 500));
        setSubmitting(false);
        handleSubmit(values);
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
