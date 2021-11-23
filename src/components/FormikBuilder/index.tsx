// Formik & Yup:
import {
  Form,
  Formik,
  FormikTouched,
  useField,
  useFormikContext,
} from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { BooleanSchema, DateSchema, NumberSchema } from "yup";
import StringSchema from "yup/lib/string";

// Component for different types of fields:
import { CheckboxInput, DateInput, SelectInput, TextInput } from "./components";

// Types:
import {
  Field,
  Field_VisibilityFilter,
  Field_VisibilityFilter_FieldAny,
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

  const FilterPasses = (filter: Field_VisibilityFilter, deps: any) => {};

  const FieldToComponent = (
    fieldParams: Field,
    deps: (boolean | FormikTouched<any> | FormikTouched<any>[] | undefined)[]
  ): React.ReactNode => {

    // Component is part of a Formik form
    const [field, meta] = useField({ name: fieldParams.name });

    // Component visibility
    const [visible, setVisible] = useState(true);

    // Change visibility when specific fields change
    useEffect(() => {
      if (
        fieldParams.visibility?.forEach((filter) => FilterPasses(filter, deps))
      )
        setVisible(true);
      else setVisible(false);
    }, [deps, fieldParams.visibility]);

    // Component by type will need to know that it is in a Formik form
    const additionalProps = {
      field: field,
      meta: meta,
    };

    // Get Component by type
    const componentByType = () => {
      switch (fieldParams.type) {
        case "text":
          return <TextInput {...additionalProps} {...fieldParams} />;
        // case "textArea":
        //   return <TextAreaInput key={x.name} {...fieldParams} />;
        case "select":
          return <SelectInput {...additionalProps} {...fieldParams} />;
        case "checkbox":
          return <CheckboxInput {...additionalProps} {...fieldParams} />;
        case "date":
          return <DateInput {...additionalProps} {...fieldParams} />;
        default:
          return <></>;
      }
    };

    // Return the Component by type with key and visibility
    return (
      <div key={fieldParams.name} hidden={!visible}>
        {componentByType()}
      </div>
    );
  };

  const BuildFields = (fields: Field[]): React.ReactNode => {
    // const { values, touched } = useFormikContext<any>();
    // return fields.map((fieldParams) => {
    //   // Gather the fields that are related to this field's visibility
    //   // to use as useEffect deps to check on them everytime they change
    //   const deps: (
    //     | boolean
    //     | FormikTouched<any>
    //     | FormikTouched<any>[]
    //     | undefined
    //   )[] = [];
    //   fieldParams.visibility?.forEach((filter) => {
    //     if (filter.hasOwnProperty("field"))
    //       deps.push(values[(filter as Field_VisibilityFilter_FieldAny).field]);
    //     deps.push(touched[(filter as Field_VisibilityFilter_FieldAny).field]);
    //     if (filter.hasOwnProperty("otherField"))
    //       deps.push(
    //         values[
    //           (filter as Field_VisibilityFilter_FieldComparisonOtherField)
    //             .otherField
    //         ]
    //       );
    //     deps.push(
    //       touched[
    //         (filter as Field_VisibilityFilter_FieldComparisonOtherField)
    //           .otherField
    //       ]
    //     );
    //   });
    //   // Return component by type with useField
    //   return FieldToComponent(fieldParams, deps);
    // });
    return <React.Fragment>WIP (Esto no es un error, funciona todo bien, lo que pasa es que esta parte está a medias)</React.Fragment>
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
