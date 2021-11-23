// Formik & Yup:
import { Button } from "antd";
import {
  Form,
  Formik,
  FormikProps,
  FormikTouched,
  useFormikContext,
} from "formik";
import moment from "moment";
import React, {  } from "react";
import * as Yup from "yup";
import { BooleanSchema, DateSchema, NumberSchema } from "yup";
import StringSchema from "yup/lib/string";

// Component for different types of fields:
import FieldWrapper from "./utils/FieldWrapper";

// Types:
import {
  Field,
  Field_VisibilityFilter_FieldAny,
  Field_VisibilityFilter_FieldComparisonOtherField,
  FormSchema,
} from "./utils/types";

// Functional Component:
type FormikBuilderProps<T = { [x: string]: any }> = {
  schema: FormSchema;
  errorMessageRequired: string;
  initialValues?: T;
  onSubmit: (values: {}) => void;
};

const FormikBuilder = (props: FormikBuilderProps) => {

  // =========================== INITIAL VALUES =========================== //

  const BuildInitValues = (
    fields: Field[],
    initialValues: {} | undefined
  ): {} => {
    let obj: { [x: string]: string | number | boolean } = {};
    fields.forEach((x) => {
      switch (x.type) {
        case "checkbox":
          obj[x.name] = false;//x.startChecked === true;
          break;
        case "date":
          obj[x.name] = moment().toISOString();
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

  // =========================== FIELDS =========================== //

  // const BuildFields = (fields: Field[]): React.ReactNode => {
  //   const { values, touched } = useFormikContext<typeof initialValues>() ?? {};
  //   return fields.map((fieldParams) => {
  //     return <FieldWrapper fieldParams={fieldParams} deps={deps} />;
  //   });
  //   // return <React.Fragment>WIP (Esto no es un error, funciona todo bien, lo que pasa es que esta parte está a medias)</React.Fragment>
  // };

  // =========================== VALIDATION =========================== //

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
          prop = Yup.date();
          break;
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
      initialValues={BuildInitValues(fields, initialValues)}
      validationSchema={BuildYup(fields, errorMessageRequired)}
      onSubmit={async (values, { setSubmitting }) => {
        await new Promise((r) => setTimeout(r, 500));
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      {(props: FormikProps<any>) => (
      <Form>
        {/* {BuildFields(fields)} */}
        {fields.map((fieldParams) => {
      return <FieldWrapper fieldParams={fieldParams} deps={[]} />;
    })}
        <Button htmlType="submit">Submit</Button>
      </Form>
      )}
    </Formik>
  );
};

export default FormikBuilder;
