/* eslint-disable no-new-func */
import { Field, FieldArray, FieldAttributes, FormikContextType, FormikValues } from "formik";
import React from "react";
import { TextInput, SelectInput, CheckboxInput, DateInput } from ".";
import { FieldSchema } from "../utils/types";
import BoxArray from "./BoxArray";

const CreateCondition = (writtenCondition: string | undefined): Function => {
  return new Function("values", `return ${writtenCondition || "true"};`);
};

// Get Component by type
export const componentByType = (props: FieldAttributes<any>, fieldParams: FieldSchema) => {
  switch (fieldParams.type) {
    case "text":
      return <TextInput {...props} {...fieldParams} />;
    // case "textArea":
    //   return <TextAreaInput key={x.name} {...fieldParams} />;
    case "select":
      return <SelectInput {...props} {...fieldParams} />;
    case "checkbox":
      return <CheckboxInput {...props} {...fieldParams} />;
    case "date":
      return <DateInput {...props} {...fieldParams} />;
    // case "upload":
    //   return <UploadInput {...props} {...fieldParams} />
    case "box":
      // return <BoxArray {...props} {...fieldParams} />;
      return <FieldArray name={fieldParams.name}>{({ push, remove }) => <BoxArray {...props} {...fieldParams} />}</FieldArray>
    default:
      return <React.Fragment></React.Fragment>;
  }
};

const FieldWrapper = (props: { fieldParams: FieldSchema; formikContext: FormikContextType<FormikValues> }) => {
  const { fieldParams, formikContext } = props;

  const VisibleCondition: Function = CreateCondition(fieldParams.visible);

  // Return the Component by type with key and visibility
  // ---------------------------------------------
  // if (VisibleCondition(formikContext.values)) {
  //   if (fieldParams.type === "box") {

  //     // RETURN GROUP OF FIELDS
  //     return (
  //       <FieldArray name={fieldParams.name}>
  //         {({ push, remove }) => <BoxArray {...props} {...fieldParams} />}
  //       </FieldArray>
  //     );
  //   } else {

  //     // RETURN SINGLE FIELD
  //     return (
  //       <Field name={fieldParams.name}>{(props: FieldAttributes<any>) => componentByType(props, fieldParams)}</Field>
  //     );
  //   }
  // } else {

  //   // RETURN EMPTY FRAGMENT (if field is invisible)
  //   return <React.Fragment></React.Fragment>;
  // }
  // ---------------------------------------------
  return VisibleCondition(formikContext.values) ? (
    // fieldParams.type === "box" ? (
    //   <FieldArray name={fieldParams.name}>{({ push, remove }) => <BoxArray {...props} {...fieldParams} />}</FieldArray>
    // ) : (
      <Field name={fieldParams.name}>{(props: FieldAttributes<any>) => componentByType(props, fieldParams)}</Field>
    // )
  ) : (
    <React.Fragment></React.Fragment>
  );
  // ---------------------------------------------
  // return VisibleCondition(formikContext.values) ? (
  //   <Field name={fieldParams.name}>{(props: FieldAttributes<any>) => componentByType(props, fieldParams)}</Field>
  // ) : (
  //   <React.Fragment></React.Fragment>
  // );
};

export default FieldWrapper;


// IDEA FOR FORM STYLES - exmaple //
const fieldArrangement = [
  {
    rows: [ "field two", "field one" ], // reordered
  },
  {
    rows: [ "field3" ],
    labelInline: true,
  },
  {
    columns: [ "field4", "field5", "field6" ],
    wrap: true,
  },
  {
    columns: [ "field7", "field8", "field9" ],
    wrap: false,
  },
];

// Would show up as:

/*

FIELD TWO
[_________________________]

FIELD ONE
[_________________________]

FIELD 3 [_________________]

FIELD 4         FIELD 5
[_________]     [_________]

FIELD 6
[_________]

FIELD 7   FIELD 8   FIELD 9
[_____]   [_____]   [_____]

*/