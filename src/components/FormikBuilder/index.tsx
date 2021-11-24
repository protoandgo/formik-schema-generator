// Formik & Yup:
import { Button } from "antd";
import {
  Field,
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  FormikProps,
  FormikTouched,
  useFormikContext,
} from "formik";
import moment from "moment";
import React from "react";
import * as Yup from "yup";
import { BooleanSchema, DateSchema, NumberSchema } from "yup";
import { AnyObject, OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
import StringSchema from "yup/lib/string";

// Component for different types of fields:
import FieldWrapper from "./utils/FieldWrapper";
import { conslog } from "./utils/testUtil";

// Types:
import {
  FB_Field,
  FB_Condition,
  FB_Condition_Any,
  FB_Condition_FieldCompareToOtherField,
  FB_Condition_FieldCompareToValue,
  FB_Condition_FieldEmpty,
  FormSchema,
  YupSchema,
  YupObjType,
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
    fields: FB_Field[],
    initialValues: {} | undefined
  ): {} => {
    let obj: { [x: string]: string | number | boolean } = {};
    fields.forEach((x) => {
      switch (x.type) {
        case "checkbox":
          obj[x.name] = false; //x.startChecked === true;
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

  const BuildYup = (fields: FB_Field[] | FB_Field) => {
    let obj: { [x: string]: YupSchema } = {};
    if (!Array.isArray(fields)) fields = [ fields ];
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
      // if (x.required) prop = prop.required(errorMessageRequired);
      obj[x.name] = prop;
    });
    conslog("YUP OBJECT", Yup.object(obj));
    return Yup.object(obj);
    // TODO mas personalización & mostrar o no mostrar ciertos campos según lo que haya en otros
  };

  // =========================== VISIBILITY =========================== //

  // const FilterPasses = (field: FB_Field, filter: FB_Condition, values: any) => {
  //   if (filter.hasOwnProperty("field")) {
  //     if (filter.hasOwnProperty("otherField")) {
  //       const xAs = filter as FB_Condition_FieldCompareToOtherField;
  //       const fieldName = xAs.field || field.name;
  //       switch (xAs.is) {
  //         case "less than":
  //           return values[fieldName] < values[xAs.otherField];
  //         case "equal":
  //           return values[fieldName] === values[xAs.otherField];
  //         case "more than":
  //           return values[fieldName] > values[xAs.otherField];
  //       }
  //     } else if (filter.hasOwnProperty("value")) {
  //       const xAs = filter as FB_Condition_FieldCompareToValue;
  //       const fieldName = xAs.field || field.name;
  //       switch (xAs.is) {
  //         case "less than":
  //           return values[fieldName] < xAs.value;
  //         case "equal":
  //           return values[fieldName] === xAs.value;
  //         case "more than":
  //           return values[fieldName] > xAs.value;
  //       }
  //     } else {
  //       const xAs = filter as FB_Condition_FieldEmpty;
  //       const fieldName = xAs.field || field.name;
  //       console.log(xAs);
  //       switch (xAs.is) {
  //         case "empty":
  //           console.log(fieldName + " is empty?");
  //           return values[fieldName] === "";
  //         case "not empty":
  //           console.log(
  //             fieldName + " is not empty? " + (values[fieldName] !== "")
  //           );
  //           return values[fieldName] !== "";
  //       }
  //     }
  //   }
  //   return false;
  // };

  // const FieldShouldBeVisible = (
  //   fieldParams: FB_Field,
  //   props: FormikProps<any>
  // ): boolean => {
  //   let v = true;
  //   if (fieldParams.visibleWhen) {
  //     if (Array.isArray(fieldParams.visibleWhen)) {
  //       for (let filter of fieldParams.visibleWhen) {
  //         // if (!FilterPasses(filter, props)) {
  //         //   v = false;
  //         //   break;
  //         // }
  //       }
  //     }
  //     else {

  //     }
  //   } else console.log("-no tiene...");
  //   return v;
  // };

  // =========================== Functional Component =========================== //

  const { initialValues, onSubmit } = props;
  const fields = props.schema.fields;

  const handleSubmit = (values: {}) => {
    // TODO si no se ha podido enviar al servidor, mostrar ese error al usuario
    onSubmit(values);
  };

  const ConditionsToYupObject = (conditions: FB_Condition[]) => {

      if (Array.isArray(conditions) || !conditions) {
        let yupObj: { [x: string]: YupSchema } = {};
        conditions?.forEach(condition => {
          let prop: YupSchema = Yup.string();
          // switch (field.type) {
          //   case "checkbox":
          //     prop = Yup.boolean();
          //     break;
          //   case "date":
          //     prop = Yup.date();
          //     break;
          //   case "email":
          //     prop = Yup.string().email("Invalid email addresss`");
          //     break;
          //   case "number":
          //     prop = Yup.number();
          //     break;
          //   case "select":
          //     prop = Yup.string();
          //     break;
          //   case "text":
          //     prop = Yup.string().max(15, "Must be 15 characters or less");
          //     break;
          // }
        })
        return Yup.object(yupObj);
      }
  }


  return (
    <Formik
      initialValues={BuildInitValues(fields, initialValues)}
      validationSchema={BuildYup(fields)}
      onSubmit={async (values, { setSubmitting }) => {
        await new Promise((r) => setTimeout(r, 500));
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      {(props: FormikProps<any>) => (
        <Form>
          {/* {BuildFields(fields)} */}
          {fields.map((fieldParams) => (
            // <Field
            //   key={fieldParams.name}
            //   hidden={FieldShouldBeVisible(fieldParams, props)}
            //   name={fieldParams.name}
            //   fieldParams={fieldParams}
            //   // component={<FieldWrapper fieldParams={fieldParams} />}
            //   component={FieldWrapper}
            // />
            <Field
              key={fieldParams.name}
              name={fieldParams.name}
              // hidden={FieldShouldBeVisible(fieldParams, props)}
              hidden={fieldParams.visibleWhen?.hasOwnProperty("isValid") ? (fieldParams.visibleWhen as YupObjType).isValid(props.values) : false}
            >
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: {
                field: FieldInputProps<any>; // { name, value, onChange, onBlur }
                form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta: FieldMetaProps<any>;
              }) => (
                <FieldWrapper
                  fieldParams={fieldParams}
                  field={field}
                  meta={meta}
                />
              )}
            </Field>
          ))}
          <Button htmlType="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikBuilder;
