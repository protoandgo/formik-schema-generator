// Formik & Yup:
import { Form, Formik, useField, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { BooleanSchema, DateSchema, NumberSchema } from "yup";
import StringSchema from "yup/lib/string";

// Component for different types of fields:
import { CheckboxInput, DateInput, SelectInput, TextInput } from "./components";

// Types:
import {
  Field,
  Field_VisibilityFilter,
  Field_VisibilityFilter_FieldComparisonOtherField,
  Field_VisibilityFilter_FieldComparisonValue,
  Field_VisibilityFilter_FieldEmpty,
  FormSchema,
} from "./types";

// Functional Component:
type FormikBuilderProps = {
  schema: FormSchema;
  errorMessageRequired: string;
  initialValues?: {};
  onSubmit: (values: {}) => void;
};

const FormikBuilder = (props: FormikBuilderProps) => {
  // =========================== Build Initial Values by Field =========================== //

  const BuildInitValues = (
    fields: Field[],
    initialValues: {} | undefined
  ): {} => {
    let obj: { [x: string]: string | number | boolean } = {};
    fields.forEach((x) => {
      switch (x.type) {
        case "checkbox":
          obj[x.name] = x.startChecked === true;
          break;
        case "date":
          break; // TODO
        case "email":
          obj[x.name] = "";
          break;
        case "number":
          obj[x.name] = 0;
          break;
        case "select":
          obj[x.name] = "";
          break;
        case "text":
          obj[x.name] = "";
          break;
      }
    });
    if (initialValues) {
      Object.assign(obj, initialValues); //obj = {...obj, ...initialValues};
    }
    return obj;
  };

  // =========================== Build Component by Field =========================== //

  const ref = useRef<any>(); // any ?

  const FilterPasses = (filter: Field_VisibilityFilter, values: any) => {
    const variablesItDependsOn = [];
  }
// [propName: string]
  const FieldToComponent = (x: Field): React.ReactNode => {
    const {
      values,
      touched,
      setFieldValue,
    } = useFormikContext<any>();
    const [field, meta] = useField({ name: x.name });
  
    useEffect(() => {
      // set the value of textC, based on textA and textB
      if (x.visibility?.forEach(filter => FilterPasses(filter, values)))
      if (
        values.textA.trim() !== '' &&
        values.textB.trim() !== '' &&
        touched.textA &&
        touched.textB
      ) {
        setFieldValue(x.name, `textA: ${textA}, textB: ${textB}`);
      }
    }, [textB, textA, touched.textA, touched.textB, setFieldValue, x.name]);
  
    return (
      <>
        <input {...props} {...field} />
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    );
    return <></>;
  }

  const BuildFields = (fields: Field[]): React.ReactNode => {
    return fields.map(FieldToComponent);






    








      // const additionalProps = {
      //   key: x.name,

      // };
      // switch (x.type) {
      //   case "text":
      //     return <TextInput {...additionalProps} {...x} />;
      //   // case "textArea":
      //   //   return <TextAreaInput key={x.name} {...x} />;
      //   case "select":
      //     return <Select {...additionalProps} {...x} />;
      //   case "checkbox":
      //     return <Checkbox {...additionalProps} {...x} />;
      //   case "date":
      //     return <DateInput {...additionalProps} {...x} />;
      //   default:
      //     return <></>;
      // }
      // // } else return <></>;
  };

  // =========================== Build Validation by Field =========================== //

  type YupSchema = BooleanSchema | StringSchema | NumberSchema | DateSchema;
  const BuildYup = (fields: Field[], errorMessageRequired: string) => {
    let obj: { [x: string]: YupSchema } = {};
    fields.forEach((x) => {
      let prop: YupSchema = Yup.string();
      switch (x.type) {
        case "checkbox":
          prop = Yup.boolean();
          break;
        case "date":
          break; // TODO
        case "email":
          prop = Yup.string().email("Invalid email addresss`");
          break;
        case "number":
          prop = Yup.number();
          break;
        case "select":
          prop = Yup.string();
          break;
        case "text":
          prop = Yup.string().max(15, "Must be 15 characters or less");
          break;
      }
      if (x.required) prop = prop.required(errorMessageRequired);
      obj[x.name] = prop;
    });
    return Yup.object(obj);
    // TODO mas personalización & mostrar o no mostrar ciertos campos según lo que haya en otros
  };

  // =========================== Functional Component =========================== //

  const { errorMessageRequired, initialValues, onSubmit } = props;
  const fields = props.schema.fields;

  const handleSubmit = (values: {}) => {
    // TODO si no se ha podido enviar al servidor, mostrar ese error al usuario
    onSubmit(values);
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={BuildInitValues(fields, initialValues)}
      validationSchema={BuildYup(fields, errorMessageRequired)}
      onSubmit={async (values, { setSubmitting }) => {
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
