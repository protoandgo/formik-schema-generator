// Formik & Yup:
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { BooleanSchema, DateSchema, NumberSchema } from "yup";
import StringSchema from "yup/lib/string";

// Component for different types of fields:
import { Checkbox, Select, TextInput } from "./components";

// =========================== Types of Fields =========================== //
type FieldAny = { // Common properties of all types of fields
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}
interface FieldTextNumberEmail extends FieldAny {
  type: "text" | "number" | "email" | "password" | "phone";
}
interface FieldCheckbox extends FieldAny {
  type: "checkbox";
  startChecked?: boolean;
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
// =========================== Types Field to export =========================== //
export type Field =
  | FieldTextNumberEmail
  | FieldCheckbox
  | FieldSelect
  | FieldDate;
// =========================== Build Initial Values by Field =========================== //
const BuildInitValues = (fields: Field[], initialValues: {} | undefined): {} => {
  let obj: { [x: string]: string | number | boolean } = {};
  fields.forEach((x) => {
    switch (x.type) {
      case 'checkbox': obj[x.name] = x.startChecked === true; break;
      case 'date': break; // TODO
      case 'email': obj[x.name] = ""; break;
      case 'number': obj[x.name] = 0; break;
      case 'select': obj[x.name] = ""; break;
      case 'text': obj[x.name] = ""; break;
    }
  });
  if (initialValues){
    console.log("obj before = " + JSON.stringify(obj));
    console.log("initialValues = " + JSON.stringify(initialValues));
    Object.assign(obj, initialValues); //obj = {...obj, ...initialValues};
    console.log("obj after = " + JSON.stringify(obj));
  }
  return obj;
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
// type YupSchema = {
//   [x: string]: BooleanSchema | StringSchema | NumberSchema | DateSchema
// };
type YupSchema = BooleanSchema | StringSchema | NumberSchema | DateSchema;
const BuildYup = (fields: Field[], errorMessageRequired: string) => {
  // TODO intl <--- NO, porque el mensaje de error se lo pasará por los props directamente
  let obj: { [x: string]: YupSchema } = {};
  fields.forEach((x) => {
    let prop: YupSchema= Yup.string();
    switch (x.type) {
      case 'checkbox': prop = Yup.boolean(); break;
      case 'date': break; // TODO
      case 'email': prop = Yup.string().email("Invalid email addresss`"); break;
      case 'number': prop = Yup.number(); break;
      case 'select': prop = Yup.string(); break;
      case 'text': prop = Yup.string().max(15, "Must be 15 characters or less"); break;
    }
    if (x.required) prop = prop.required(errorMessageRequired);
    obj[x.name] = prop;
  });
  return  Yup.object(obj);
  // TODO mas personalización & mostrar o no mostrar ciertos campos según lo que haya en otros
}

// =========================== Functional Component =========================== //

export type FormSchema = {
  fields: Field[];
  // TODO ????
}
type FormikBuilderProps = {
  schema: FormSchema;
  errorMessageRequired: string;
  initialValues?: {};
  onSubmit: (values: {}) => void;
};

const FormikBuilder = (props: FormikBuilderProps) => {
  const { errorMessageRequired, initialValues, onSubmit } = props;
  const fields = props.schema.fields;

  const handleSubmit = (values: {}) => {
    // TODO si no se ha podido enviar al servidor, mostrar ese error al usuario
    onSubmit(values);
  }

  return (
    <Formik
      initialValues={BuildInitValues(fields, initialValues)}
      validationSchema={BuildYup(fields, errorMessageRequired)}
      onSubmit={async (values, { setSubmitting }) => {
        // console.log(values);
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
