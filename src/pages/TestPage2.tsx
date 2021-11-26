import { Checkbox, Input, Typography } from "antd";
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  Formik,
  FormikProps,
  FormikValues,
  useField,
} from "formik";
import Form from "rc-field-form/es/Form";
import React from "react";

interface FieldInfo_Any {
  name: string;
}
interface FieldInfo_Common extends FieldInfo_Any {
  type: "text" | "checkbox";
}
interface FieldInfo_Array extends FieldInfo_Any {
  type: "array";
  fields: FieldInfo[];
}
interface FieldInfo_Object extends FieldInfo_Any {
  type: "object";
  fields: FieldInfo[]; // { [x:string]: FieldInfo };
}
type FieldInfo = FieldInfo_Common | FieldInfo_Array | FieldInfo_Object;
type FBSchema = {
  formName: string;
  fields: FieldInfo[];
};

type FBField = {
  info: FieldInfo;
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
  helpers: FieldHelperProps<any>;
};
const InputField = (props: FBField) => {
  return (
    <React.Fragment>
      <span>{props.info.name}</span>
      <Input {...props.field} />
      <span color="red">{props.meta.error}</span>
    </React.Fragment>
  );
};
const CheckboxField = (props: FBField) => {
  return (
    <React.Fragment>
      <span>{props.info.name}</span>
      <Checkbox {...props.field} />
      <span color="red">{props.meta.error}</span>
    </React.Fragment>
  );
};

const RenderField = (
  fieldInfo: FieldInfo,
  index: number,
  formikProps: FormikProps<FormikValues>,
  beforeName: string
) => {
  let field = null;

  // const [f, m, h] = useField(beforeName + fieldInfo.name);
  // const fieldProps = { info: fieldInfo, field: f, meta: m, helpers: h };
  const fullName = beforeName + fieldInfo.name;
  console.log("Displaying " + fullName);
  // const fieldProps = {
  //   info: fieldInfo,
  //   field: formikProps.getFieldProps(fullName),
  //   meta: formikProps.getFieldMeta(fullName),
  //   helpers: formikProps.getFieldHelpers(fullName) };

  switch (fieldInfo.type) {
    case "text":
      console.log(fullName + " is of type 'text'");
      field = <span>Type is Text</span>;
      // field = <InputField {...fieldProps}></InputField>;
      break;

    case "checkbox":
      console.log(fullName + " is of type 'checkbox'");
      field = <span>Type is Checkbox</span>;
      // field = <CheckboxField {...fieldProps}></CheckboxField>;
      break;

    case "array":
      console.log(fullName + " is of type 'array'");
      field = <span>Type is Array</span>;
        // // NESTED FIELDS (ARRAY)
        // field = fieldInfo.fields.map((y, i) =>
        //   // NESTED FIELD
        //   RenderField(
        //     y,
        //     i,
        //     formikProps,
        //     `${fullName}[${i}].`
        //   )
        // );
      break;
    case "object":
      console.log(fullName + " is of type 'object'");
      field = <span>Type is Object</span>;
        // // NESTED FIELDS (OBJECT)
        // field = fieldInfo.fields.map((y, i) =>
        //   // NESTED FIELD
        //   RenderField(
        //     y,
        //     i,
        //     formikProps,
        //     `${fullName}.`
        //   )
        // );
      break;

    default:
      console.log(fullName + " is of type 'no ???'");
      field = <span>Type not considered</span>;
      break;
  }

  // FIELD
  return <div key={index}>{field}</div>;
};

type TestFBProps = {
  schema: FBSchema;
  initialValues: { [x:string]: any };
}
const TestFB = (props: TestFBProps) => {
  return (
    <React.Fragment>
      {/* FORM TITLE */}
      <Typography.Title>{props.schema.formName}</Typography.Title>
      {/* FORMIK */}
      <Formik
        initialValues={props.initialValues}
        onSubmit={console.log}
        render={(formikProps) => (
          // FORM
          <Form>
            {/* FIELDS */}
            {/* {Object.entries(props.schema).map((x, i) => */}
            {props.schema.fields.map((x, i) =>
              // FIELD
              RenderField(x, i, formikProps, "")
            )}
          </Form>
        )}
      />
    </React.Fragment>
  );
};

const TestPage2 = () => {
  return (
    <TestFB
    // ----------------------------------------------
      // schema={{ formName: "Formulario", fields: [
      //   { name: "users", type: "object", fields: [
      //     { name: "userName", type: "text" },
      //     { name: "hobbies", type: "array", fields: [
      //       { name: "hobby", type: "text" }]}] }] }}
      // initialValues={{ users: [{ userName: "", hobbies: [{ hobby: "" }] }] }}
      // ----------------------------------------------
      schema={{ formName: "Formulario", fields: [{ name: "userName", type: "text" }] }}
      initialValues={{ userName: "" }}
      // ----------------------------------------------
    />
  );
};

export default TestPage2;
