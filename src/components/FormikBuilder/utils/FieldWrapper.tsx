/* eslint-disable no-new-func */
import { Field, FieldAttributes, FormikContextType, FormikValues } from "formik";
import React from "react";
import { TextInput, SelectInput, CheckboxInput, DateInput } from "../components";
import { FieldSchema } from "./types";

const CreateCondition = (writtenCondition: string | undefined): Function => {
  if (!writtenCondition) return new Function('return true;');
  else {
    return new Function('values', `return ${writtenCondition};`);
  }
};

const FieldWrapper = (props: {
  fieldParams: FieldSchema;
  // field: FieldInputProps<any>;
  // meta: FieldMetaProps<any>;
  formikContext: FormikContextType<FormikValues>;
}) => {
  const { fieldParams, formikContext } = props;

  // Component is part of a Formik form
  // const [field, meta] = useField({ name: fieldParams.name });

  // Component by type will need to know that it is in a Formik form
  // const additionalProps = {
  //   field: formikContext.getFieldProps(fieldParams.name),
  //   meta: formikContext.getFieldMeta(fieldParams.name),
  // };

  // conslog("PROPS", props);

  // Get Component by type
  const componentByType = (props: FieldAttributes<any>) => {
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
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  const VisibleCondition: Function = CreateCondition(fieldParams.visible);

  // Return the Component by type with key and visibility
  return (
    <Field name={fieldParams.name}>
      {(props: FieldAttributes<any>) => {
        if (VisibleCondition(formikContext.values)) {
          return componentByType(props);
        } else {
          return <React.Fragment></React.Fragment>
        }
      }}
    </Field>
  );
};

export default FieldWrapper;
